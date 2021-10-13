import GraphQLServer from "./server";

const graphQLServer = new GraphQLServer();

graphQLServer.listen((port: number) => console.log("Server listen", port));