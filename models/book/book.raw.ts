export interface BookRaw {
  isbn: string;
  title: string;
  published: string;
  author: string; // added to align with mockBooks data
  salesCount: number; // number of times the book was sold
  price: number; // added price (USD)
  discount?: number; // optional discount percentage (e.g., 0.3 for 30%)
}
