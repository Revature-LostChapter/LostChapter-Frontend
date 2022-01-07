import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { User } from 'User';
import { Cart } from '../Cart';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router,
    private addProductToCartService: SearchProductsService) { }
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

  setShowResults(showResults: SearchProducts[]) {
    this.showResults = showResults;
  }

  selected = 'option2';

  showResults: SearchProducts[] = [];

  // for page pagination -> // p: number = 1;

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
}
