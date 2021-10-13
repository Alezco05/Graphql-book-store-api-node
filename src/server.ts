import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer, Server } from "http";
import schema from "./schema";

class GraphQLServer {
  //Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT: number = 3000;
  private schema!: GraphQLSchema;
  constructor(schema: GraphQLSchema) {
    if (schema === undefined) {
      throw new Error(
        "Se necesita un schema de GraphQL para trabajar con APIS de GraphQL"
      );
    }
    this.schema = schema;
    this.init();
  }
  private init() {
    this.configExpress();
    this.configApolloServerExpress();
    this.configRoutes();
  }
  private configExpress() {
    this.app = express();
    this.app.use(compression());
    this.httpServer = createServer(this.app);
  }
  private async configApolloServerExpress() {
    const apolloServer = new ApolloServer({
      schema: this.schema,
      introspection: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
      app: this.app,
      cors: true,
    });
  }
  private configRoutes() {
    this.app.use("/hello", (_, res) => {
      res.send("Bienvenido");
    });
    this.app.get("/", (_, res) => {
      res.redirect("/graphql");
    });
  }
  listen(callback: (port: number) => void): void {
    this.httpServer.listen(+this.DEFAULT_PORT, () => {
      callback(+this.DEFAULT_PORT);
    });
  }
}
export default GraphQLServer;
