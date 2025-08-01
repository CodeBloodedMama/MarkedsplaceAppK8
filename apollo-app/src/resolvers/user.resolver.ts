import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';
import { GraphQLError } from 'graphql';

function jwtSignature(user){
  return jwt.sign({ 
      userId: user._id,
      username: user.username
    },
    process.env.JWT_PRIVATE_KEY, {
      expiresIn: process.env.TOKEN_EXPIRY_TIME
    }
  );
}

const userResolver = {
  Query: {
    getUsers: async (_, { total }, contextValue) => {
      try {
        const users = await UserModel.find()
          .sort({ createdAt: -1 })
          .limit(total);
        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getUserById: async (_, { id }, contextValue) => {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { username, password } = input;

      const userToCreate = new UserModel({
        username: username,
        password: password
      });

      const user = await userToCreate.save();
      const token = jwtSignature(user);

      return {
        __typename: 'AuthResponse',
        ...user.toObject(),
        userJwt: {
          token: token,
        },
      };
    },

    login: async (_, { input: { username, password } }, context) => {
      const user = await UserModel.findOne({
        $and: [{ username: username }, { password: password }],
      });
      
      if (user) {
        const token = jwtSignature(user);

        return {
          ...user.toObject(),
          userJwt: {
            token: token,
          },
        };
      }

      throwCustomError(
        'User does not exist!',
        ErrorTypes.BAD_USER_INPUT
      );
    },
  },
};

export default userResolver;
