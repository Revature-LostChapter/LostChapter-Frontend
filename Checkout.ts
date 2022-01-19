export interface Checkout {
  transactionId: number,
  orderNumber: string,
  totalPrice: number,
  previousOrder: [
      string
  ],
  transactionDate: Date
}
