import ProductModel from '../models/product.model.js';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';

const productResolver = {
  Query: {
    // get product by id
    product: async (parent, { id }, context) => {
      const product = await ProductModel.findById(id);
      if (!product) {
        throwCustomError(
          `Product (${id}) does not exists.`,
          ErrorTypes.NOT_FOUND
        );
      }
      return {
        id: product._id,
        ...product.toObject(),
      };
    },

    // get all products
    async getProducts(parent, args, context) {
      const amount = args.amount;
      const allProducts = await ProductModel.find()
        .sort({ createdAt: -1 })
        .limit(amount);
      return allProducts;
    },
  },

  Mutation: {
    // create product
    createProduct: async (
      parent,
      { productInput: { name, price, description, category } },
      context
    ) => {
      const productToCreate = new ProductModel({
        name: name,
        price: price,
        description: description,
        category: category,
        image: "none",
        sellerId: context.user.userId,
        sellerName: context.user.username
      });
      const res = await productToCreate.save();
      return {
        id: res.id,
        ...res.toObject(),
      };
    },

    // delete product
    deleteProduct: async (_, { id }, context) => {
      const isDeleted = (await ProductModel.deleteOne({ _id: id })).deletedCount;
      return {
        isSuccess: isDeleted,
        message: 'Product deleted.',
      };
    },

    // edit product
    editProduct: async (
      _,
      { id, productInput: { name, price, description, category } },
      { user }
    ) => {
      const isEdited = (
        await ProductModel.updateOne(
          { _id: id },
          { 
            name: name,
            price: price,
            description: description,
            category: category,
          }
        )
      ).modifiedCount;
      return {
        isSuccess: isEdited,
        message: 'Product Edited.',
      };
    },
  },
};

export default productResolver;
