export interface BooksToBuy {
  booksToBuy: {
    books: {
      bookId: number;
      bookName: string;
      synopsis: string;
      bookPrice: number;
      saleIsActive: boolean;
      saleDiscountRate: number;
      bookImage: string;

    };
    quantityToBuy: number;

  }[];
}
