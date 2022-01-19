import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { User } from 'User';
import { Cart } from '../../../Cart';
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
  errorMessage!: string;

  showResults: SearchProducts[] = [];
  selectedProducts!: SearchProducts;

  dialogResult!: string;

  page: number = 1;
  collection = [];

  constructor(private loginService: LoginService, private router: Router,
    private addProductToCartService: SearchProductsService, public dialog: MatDialog, private route: ActivatedRoute) {}

  cartId!: number;
  quantity!: string;
  private sub: any;

  ngOnInit(): void {
    // this.checkIfLoggedIn();
    this.sub = this.route.params.subscribe(params => {
    this.showKeyword = params['searchKeyword'];
    this.showSearchResults()

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // checkIfLoggedIn() {
  //   this.loginService.checkLoginStatus().subscribe({
  //     next: (res)=> {
  //       if(res.status === 200 || res.status === 201){
  //         let body = <User> res.body;

  //         if(body.role === 'Customer'){
  //             this.cartId = body.id;
  //         }
  //         if(body.role === 'Admin'){
  //           this.router.navigate(['/admin']);
  //         }
  //       }
  //     },
  //     error:(err) => {
  //       if(err.status === 400 || err.status === 404){
  //         this.router.navigate(['']);
  //       }
  //     }
  //   })
  // }

  onAddToCart(productId: number){
    this.addProductToCartService.addToCart(String(productId), String("1"), String(this.cartId)).subscribe({
      next: (res) => {
        if(res.status === 200 || res.status === 201) {
          let body = <Cart> res.body;
        }
      },
      error: (err) =>{
        this.errorMessage = err.console.error;

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

      });

    modalRef.afterClosed().subscribe(result => {
      this.dialogResult = result;
    });

  }

  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }

  showKeyword!: string;
  setShowKeyowrd(showKeyword: string){
    this.showKeyword = showKeyword;
    this.showSearchResults();
  }

  showSearchResults(){
    this.addProductToCartService.getSearchResult(this.showKeyword).subscribe((res) => {
      let body = <SearchProducts[]> res.body;
      this.showResults = body;
  })
  }

}
