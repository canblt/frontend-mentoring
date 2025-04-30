export interface Book {
  isbn: string;
  title: string;
  published: Date;
}

export const defaultErrorBook: Book = {
  isbn: '',
  title: '',
  published: new Date(),
};
