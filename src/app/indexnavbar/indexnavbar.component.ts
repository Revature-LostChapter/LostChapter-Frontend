import { User } from 'User';
import { LoginService } from '../login.service';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { SearchProducts } from 'SearchProduct';
import { SearchProductsService } from '../search-products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.css']
})
export class IndexnavbarComponent implements OnInit {
  loggedIn:boolean= false;
  notLoggedIn:boolean= true;
  ableToSignUp:boolean= true;
  ableToLogIn:boolean= true;
  getUserStatus(){

  }

  currentUser!: String;

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200 || res.status === 201){ // depending on the status
        let body = <User> res.body;
        this.ableToSignUp = !this.ableToSignUp;
        this.currentUser = body.username;
        this.ableToLogIn = !this.ableToLogIn;
        this.loggedIn = !this.loggedIn;
        this.notLoggedIn = !this.notLoggedIn;
      }
    },
    (err) => {

    });
  }
  constructor(private loginService:LoginService, private http: HttpClient, private searchProductService: SearchProductsService, private router: Router) { }

  searchProduct!: SearchProducts;

  isSearchBlank!: true;

  ngOnInit(): void {
    this.checkIfLoggedIn();
    // get current signed in user, so it will be used to toggle loggedInTrue and show the user's username
  }

  searchItem!: string;
  @Output( "searchProduct") searchProductEmitter = new EventEmitter<SearchProducts[]>()

  // for page pagination
  // p: number = 1;
  // collection: any[] = someArrayOfThings;

  displaySearchResults() {
    this.searchProductService.getSearchResult(this.searchItem).subscribe((res) => {
        let body = <SearchProducts[]> res.body;
        this.searchProductEmitter.emit(body);
        this.router.navigate(['/search-results'])

    })
  }
}
