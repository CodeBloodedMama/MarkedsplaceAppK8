import jwt from 'jsonwebtoken';
import throwCustomError, {
  ErrorTypes,
} from '../helpers/error-handler.helper.js';

const getUser = async (token) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req, res }) => {
  if (req.body.operationName === 'IntrospectionQuery') {
    return {};
  }

  // if operation correspons to either CreateUser or Login,
  // then return - no token needed
  if (
    req.body.operationName === 'CreateUser' ||
    req.body.operationName === 'Login'
  ) {
    return {};
  }

  // else, verify that the user has a valid token,
  // return error message if not valid,
  // or return the user info if it is valid
  const token = req.headers.authorization || '';
  const user = await getUser(token);

  if (!user) {
    throwCustomError('User is not Authenticated', ErrorTypes.UNAUTHENTICATED);
  }

  // this return user information, 
  // this can be accessed by other resolvers through the context -
  // like how we do in createProduct when we append seller information
  return { user };
};

export default context;
