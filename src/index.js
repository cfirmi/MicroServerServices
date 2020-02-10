import { ApolloServer, makeExecutableSchema, PubSub } from 'apollo-server';
import { importSchema } from 'graphql-import';

import prisma from './prisma'
import { resolvers, fragmentReplacements } from './resovlers/index'

const typeDefs = importSchema('./src/schema/schema.graphql')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false }
})

export const pubsub = new PubSub();


export default new ApolloServer({
  schema,
  context: request => { return { ...request, prisma } },
    fragmentReplacements,
      playground: {
      settings: {
        'request.credentials': 'include',
    },
    },
  },
);
