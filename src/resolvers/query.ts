import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/Book";
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
    bookList: (): Array<IBook> => data.books,
  },
};

export default queryResolvers;
