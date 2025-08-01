import gql from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    _id: String
    username: String
    password: String
  }
`;
export default userTypeDefs;
