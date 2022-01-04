export interface Cart {
  cartId: number;
  user: {
    firstName: string;
    lastName: string;
  };

  quantities: {
    product: {
      id: number;
      name: string;
      price: number;
    };
    quantity: number;
<<<<<<< HEAD
  }[];
=======
  }[]
>>>>>>> cart-feature
}
