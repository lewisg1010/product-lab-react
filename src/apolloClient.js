import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cky85ol262n3s01z42208339l/master",
    cache: new InMemoryCache(),
});

export default client;