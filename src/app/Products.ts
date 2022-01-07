export interface Products {
  id: number;
  ISBN: string;
  book_title: string;
  synopsis: string;
  author: string;
  publisher: string;
  genre: string;
  year: number;
  edition: string;
  binding_type: string;
  buy_price: number;
  rent_price: number;
  condition: string;
  quantity: number;
  saleIsActive: boolean;
}
