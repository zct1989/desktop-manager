import { GraphQLClient } from 'graphql-request';
import { inject } from 'vue';

const endpoint = '/graphql';
const DefaultGraphQLClient = 'DefaultGraphQLClient ';

export const createGraphQL = () => {
  const graphQLClient = new GraphQLClient(endpoint, {});
  return {
    install: (app, options) => {
      app.provide(DefaultGraphQLClient, graphQLClient);
    },
  };
};

export const useRequest = () => {
  const graphQLClient = inject(DefaultGraphQLClient) as GraphQLClient;
  return graphQLClient.request.bind(graphQLClient);
};
