import { GraphQLClient } from 'graphql-request'
const GRAPHQL_ENDPOINT = import.meta.env.VITE_HYGRAPH_URL

export const client = new GraphQLClient(GRAPHQL_ENDPOINT)