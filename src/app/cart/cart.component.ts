import { Component, OnInit } from '@angular/core';
import { Cart } from '../Cart';
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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    /* still need to add checkLoginStatus().subScribe in this line later */

    this.cartService;
  }
}
