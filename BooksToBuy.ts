export interface BooksToBuy {
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
