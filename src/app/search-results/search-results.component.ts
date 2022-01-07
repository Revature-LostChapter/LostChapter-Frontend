import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { User } from 'User';
import { Cart } from '../Cart';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  selected = 'option2';

  showResults: SearchProducts[] = [];
  selectedProducts!: SearchProducts;

  dialogResult!: string;

  page: number = 1;
  collection = [];

  constructor(private loginService: LoginService, private router: Router,
    private addProductToCartService: SearchProductsService, public dialog: MatDialog) {}

  cartId!: number;
  quantity!: string;

  ngOnInit(): void {

  }

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200 || res.status === 201){ // depending on the status
        let body = <User> res.body;

        if(body.role === 'Customer'){
          this.cartId = body.id;
        }

        if(body.role === 'Admin'){
          this.router.navigate(['/admin']);
        }
      }
    },
    (err) => {

    });
  }

  onAddToCart(productId: number){
    this.addProductToCartService.addToCart(String(productId), this.quantity, String(this.cartId)).subscribe({
      next: (res) => {
        if(res.status === 200 || res.status === 201) {
          let body = <Cart> res.body;
          console.log(body);
        }
      },
      error: (err) =>{
        console.log(err);

      }
    })

  }

  onDisplayProduct(bookId: number){
    let modalRef = this.dialog.open(DisplayProductModalComponent, {
      width: '1400px',
      height: '700px',
      data: 'Book Information'
    });

      this.addProductToCartService.getBookById(bookId).subscribe((res) => {
          let responseObj = <SearchProducts>res.body;
          this.selectedProducts = responseObj

          let instance = modalRef.componentInstance;
          instance.selectedProducts = this.selectedProducts;

          console.log('modalRef', modalRef)
      });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }
}
