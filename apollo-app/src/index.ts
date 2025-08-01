import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typedefs from './schemas/index.schema.js';
import resolvers from './resolvers/index.resolver.js';

import context from './context/context.js';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: typedefs,
  resolvers: resolvers,
  includeStacktraceInErrorResponses: false,
  introspection: true,
});

// connect to mongo database
const conn = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose
  .connect(conn)
  .then(() => {
    console.log('Connected to MongoDB..');
    return startStandaloneServer(server, {
      listen: { port: 4000 },
      context: context,
    });
  })
  .then((server) => {
    console.log(`🚀  Server ready at: ${server.url}`);
  });
