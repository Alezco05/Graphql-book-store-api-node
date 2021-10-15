import { IResolvers } from "@graphql-tools/utils";
import data from "../data";
import { IBook } from "../interfaces/Book";
import { IPeople } from "../interfaces/People";
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
    peopleList: (): Array<IPeople> => data.people,
    book: (_: void, args: { id: string }): IBook => data.books.filter((b) => b.id === args.id)[0],
    person: (_: void, args: { id: string }): IPeople => data.people.filter((p) => p.id === args.id)[0]  
  },
};

export default queryResolvers;
