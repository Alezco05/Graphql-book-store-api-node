import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer, gql } from "apollo-server-express";
import compression from "compression";
import express from "express";
import { GraphQLSchema } from "graphql";
import { createServer } from "http";

async function start() {
  const app = express();
  app.use(compression());
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
    app,
    cors: true,
  });
  app.use("/hello", (_, res) => {
    res.send("Bienvenido");
  });
  app.get("/", (_, res) => {
    res.redirect("/graphql");
  });
  const httpServer = createServer(app);
  httpServer.listen(
    {
      port: 3000,
    },
    () => console.log("Server listen 3000")
  );
}
start();
