import gql from 'graphql-tag';

const userSchema = gql`

  input AuthInput {
    username: String!
    password: String!
  }

  type Query {
    getUsers(total: Int): [User]
    getUserById(id: ID!): User!
  }

  type Jwt {
    token: String!
  }

  type AuthResponse {
    _id: String
    username: String
    userJwt: Jwt
  }

  type Mutation {
    login(input: AuthInput): AuthResponse
    signup(input: AuthInput): AuthResponse
  }
`;

export default userSchema;
