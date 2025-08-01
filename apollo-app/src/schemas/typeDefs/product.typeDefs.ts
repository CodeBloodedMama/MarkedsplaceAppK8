import gql from 'graphql-tag';

const productTypeDefs = gql`
  type Product {
    id: ID
    name: String
    price: Int
    description: String
    category: String
    image: String
    sellerId: String
    sellerName: String
  }
`;
export default productTypeDefs;
