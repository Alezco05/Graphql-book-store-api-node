import { IResolvers } from "@graphql-tools/utils";
const queryResolvers: IResolvers = {
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

export default queryResolvers;
