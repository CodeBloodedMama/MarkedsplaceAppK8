import gql from 'graphql-tag';

const productSchema = gql`
  input ProductInput {
    name: String
    price: Int
    description: String
    category: String
  }

  # union SingleProductResult = Product | NotExistsError

  type Query {
    product(id: ID!): Product!
    getProducts(amount: Int): [Product]
  }

  type ProductSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(id: ID!): ProductSuccess
    editProduct(id: ID!, productInput: ProductInput): ProductSuccess
  }
`;

export default productSchema;
