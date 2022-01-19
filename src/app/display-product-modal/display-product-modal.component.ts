import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { CartService } from 'src/service/cart.service';
import { User } from 'User';
import { Cart } from 'Cart';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-display-product-modal',
  templateUrl: './display-product-modal.component.html',
  styleUrls: ['./display-product-modal.component.css']
})
export class DisplayProductModalComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router, private loginService: LoginService, private addProductToCartService: SearchProductsService, public dialog: MatDialog, private getGenreService: SearchProductsService, public dialogRef: MatDialogRef<DisplayProductModalComponent>, @Inject(MAT_DIALOG_DATA)public data: string) { }

  selectedProducts!: SearchProducts;
  errorMessage!: string;
  cartId!: number;
  quantity = 1;
  userId!: number;
  added?: boolean;
  addedToCart = "Item have been added to Cart";

  role!: String;

  addToCart = "Add to Cart";

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  onCloseDisplayProduct() {
    this.dialogRef.close('Confirm');
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe({
      next: (res) => {
        if (res.status === 200) {
          let body = <User>res.body;
          this.role = body.role;
          console.log(this.role);
          if (body.role === 'Customer') {
            this.cartId = body.id;
            this.cartService.getCartFromCustomerPage(String(this.cartId));
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

  onAddToCart(productId: number){
    this.addProductToCartService.addToCart(String(productId), String(this.quantity), String(this.cartId)).subscribe({
      next: (res) => {
        if(res.status === 200) {
          let body = <Cart> res.body;
          this.added = true;
        }
      },
      error: (err) => {
        this.errorMessage = err.error;

      }
    })
  }

}
