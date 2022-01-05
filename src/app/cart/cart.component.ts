import { Component, OnInit } from '@angular/core';
import { Cart } from '../Cart';
import { Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';
import { LoginService } from '../login.service';
import { User } from 'User';

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

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;

          if (body.role === 'customer') {
            console.log(body);
            this.cartId = body.id;
            this.cartService.getCarFromCustomerPage(String(this.cartId));
            console.log(this.cartId);
          }
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.router.navigate(['']);
        }
      },
    });

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
  onDeleteButtonClick(productId: number) {
    this.cartService
      .deleteProductFromCart(String(productId), String(this.cartId))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            let body = <Cart>res.body;
            console.log(body);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
