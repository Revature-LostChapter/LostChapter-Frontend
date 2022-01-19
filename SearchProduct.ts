export interface SearchProducts  {
  bookId: number;
  bookName: string;
  author: string;
  bookImage: string;
  genre: {genre: string; id: number;}
  edition: string;
  bookPrice: number;
  publisher: string;
  year: number;
  synopsis: string;
  isbn: string;
  saleIsActive: boolean;
  saleDiscountRate: number;
  quantity: number;
}
