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
      bookPrice: number;
      bookImage: string;

    };
    quantityToBuy: number;

  }[];
}
