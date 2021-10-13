export interface IBook {
  id: string;
  title: string;
  isbn: string;
  pageCount?: number;
  publishedDate?: string;
  thumbnailUrl?: string;
  status: string;
  authors: string[];
}
