import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express, { Application } from "express";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { createServer, Server } from "http";

class GraphQLServer {
  //Propiedades
  private app!: Application;
  private httpServer!: Server;
  private readonly DEFAULT_PORT: number = 3000;
  constructor() {
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
    // Definir los tipos de definicion
    const typeDefs = gql`
      type Query {
        hello: String!
        helloWithName(name: String): String!
        peopleNumber: Int!
      }
    `;
    const resolvers = {
      Query: {
        hello: () => "Hola a la API de Graphl",
        helloWithName: (
          _: void,
          args: { name: string },
          context: any,
          info: object
        ) => {
          console.log(info);
          return `Hola ${args.name}`;
        },
        peopleNumber: () => 103,
      },
    };
    // Construir el schema ejecutable
    const schema: GraphQLSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    const apolloServer = new ApolloServer({
      schema,
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
