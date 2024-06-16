import { getToken } from "@/modules/authentication/services/token";
import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:3001/graphql",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }),
  });
});