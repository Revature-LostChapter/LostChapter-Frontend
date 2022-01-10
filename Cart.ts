export interface Cart {
  cartId: number;
  user: {
    firstName: string;
    lastName: string;
  };

  booksToBuy: {
    books: {
      bookId: number;
      bookName: string;
      synopsis: string;
    };
    bookImage: string;
    bookPrice: number;
    quantityToBuy: number;

  }[];
}
