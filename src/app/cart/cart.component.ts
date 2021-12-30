import { Component, OnInit } from '@angular/core';
import { Cart } from '../Cart';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartId!: number;
  cart!: Cart;
  priceTotal!: Cart[];

  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    /* still need to add checkLoginStatus().subScribe in this line later */

    this.cartService.sub.subscribe((data) => {
      console.log(data);
      this.cart = data;

      for (let i = 0; i < data.quantities.length; i++) {
        let pPrice = data.quantities[i].product.price;
        let pQuantity = data.quantities[i].quantity;
        let individualPrice = Number(pPrice) * Number(pQuantity);

        let totalPrice = Number(this.totalPrice) + Number(individualPrice);
        totalPrice = Math.round(totalPrice * 100) / 100;

        this.totalPrice = totalPrice;
      }
    });
  }
}
