import GraphQLServer from "./server";
import schema from "./schema";
const graphQLServer = new GraphQLServer(schema);

graphQLServer.listen((port: number) => console.log("Server listen", port));