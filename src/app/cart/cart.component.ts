import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../Cart';
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
  userId!: number;
  cart!: Cart;
  priceTotal!: Cart[];

  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.calculateProduct();
  }

  calculateProduct(){
    this.cartService.sub.subscribe((res) => {
      console.log(res);
      this.cart = res;

      for (let i = 0; i < res.booksToBuy.length; i++) {
        let pPrice = res.booksToBuy[i].bookPrice;
        let pQuantity = res.booksToBuy[i].quantityToBuy;
        let individualPrice = Number(pPrice) * Number(pQuantity);

        let totalPrice = Number(this.totalPrice) + Number(individualPrice);
        totalPrice = Math.round(totalPrice * 100) / 100;

        this.totalPrice = totalPrice;
      }
    });
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 200) {
          let body = <User>res.body;
          if (body.role === 'Customer') {
            this.userId = body.id;
            console.log(this.userId);
            this.cartService.getCartFromCustomerPage(String(this.userId));
          }
        }
      },
      error: (err) => {
        if (err.status === 400) {
          this.router.navigate(['']);
        }
      },
    });
  }

  onDeleteButtonClick(productId: number) {
    this.cartService
      .deleteProductFromCart(String(productId), String(this.userId))
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

  refreshPage(){
    this.ngOnInit();
  }
}
