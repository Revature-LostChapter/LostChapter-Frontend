import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../Cart';
import { NavigationEnd, Router } from '@angular/router';
import { CartService } from 'src/service/cart.service';
import { LoginService } from '../login.service';
import { User } from 'User';
import { lastValueFrom } from 'rxjs';
import { BooksToBuy } from 'BooksToBuy';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId!: number;
  cart!: Cart;
  priceTotal!: Cart[];
  booksToBuy!: BooksToBuy[];
  searchItem = '';

  mySubscription: any;


  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getCartProduct();
  }

  getCartProduct(){
    this.cartService.sub.subscribe((res) => {
      this.cart = res;
    });
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
          if (body.role === 'Customer') {
            this.userId = body.id;
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
    this.cartService.deleteProductFromCart(String(productId), String(this.userId)).subscribe({
        next: (res) => {
          if (res.status === 200) {
            let body = <Cart>res.body;
            this.cart = body

          }
        },
        error: (err) => {
        },
      });
  }

  calculateTotalPrice(booksToBuy: any){
      return booksToBuy?.reduce((previousValue: number, currentValue: { books: { bookPrice: number; }; quantityToBuy: number; }) =>
      previousValue + currentValue.books.bookPrice * currentValue.quantityToBuy, 0);

  }

  // for future ref
  newRefreshPage(){
    this.ngOnInit();
  }

  refreshPage(){
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentRoute]);
    })
  }
}
