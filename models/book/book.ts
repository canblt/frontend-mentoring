export interface Book {
  isbn: string;
  title: string;
  published: Date;
  author: string; // added
  salesCount: number; // added
  price: number; // added
  discount?: number; // percent discount (0-1), e.g., 0.3 = 30%
}

export const defaultErrorBook: Book = {
  isbn: '',
  title: '',
  published: new Date(),
  author: '',
  salesCount: 0,
  price: 0,
  discount: 0,
};
