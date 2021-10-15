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
    bookList: (): {
      status: boolean;
      message: string;
      list: Array<IBook>;
    } => ({ status: true, message: "Lista de libros", list: data.books }),
    peopleList: (): Array<IPeople> => data.people,
    book: (
      _: void,
      args: { id: string }
    ): {
      status: boolean;
      message: string;
      item: IBook;
    } => {
      const bookFind = data.books.filter((b) => b.id === args.id)[0];
      return {
        status: bookFind === undefined ? false: true,
        message: bookFind === undefined ? `Libro con el id: ${args.id} encontrado`: `No se encontro el libro con el id: ${args.id}`,
        item: bookFind,
      
      } 
    },
    person: (_: void, args: { id: string }): IPeople =>
      data.people.filter((p) => p.id === args.id)[0],
  },
};

export default queryResolvers;
