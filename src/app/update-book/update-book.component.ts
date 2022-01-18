import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { User } from 'User';
import { AdminService } from '../admin.service';
import { LoginService } from '../login.service';
import { SearchProductsService } from '../search-products.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  constructor(private searchProductService: SearchProductsService, private route: ActivatedRoute, private adminService: AdminService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.sub = this.route.params.subscribe(params => {
      this.bookId = params[`bookId`];
      this.getBookById();
    })
  }

  currentUser!: User;
  // success message
  successMessage!: string;

  // error message
  errorMessage!: string;

  private sub: any;

  bookId!: number;
  bookName!: string;
  synoposis!: string;
  author!: string;
  genre!: string;
  id!: number;
  quantity!: number;
  year!: number;
  edition!: string;
  publisher!: string;
  salesIsActive!: boolean;
  salesDiscountRate!: number;
  bookPrice!: number;
  bookImamge!: string;
  isbn!: string;

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200){ // depending on the status
        let body = <User> res.body;
        if(body.role === 'Customer'){
          this.router.navigate(['']);
        }
      } else if (res.status === 400){
        this.router.navigate(['']);
      }
    },
    (err) => {

    });
  }

  updateBook!: SearchProducts;

  getBookById() {
    this.searchProductService.getBookById(this.bookId).subscribe((res) => {
      let body = <SearchProducts> res.body;
      console.log(body);
      this.updateBook = body;

    });
  }

  ngOnDestory(){
    this.sub.unsubscribe();
  }

  updateBooksClick(){
    this.adminService.updateBooks(this.bookId, this.bookName, this.synoposis, this.author, this.genre, this.id, this.quantity,
      this.year, this.edition, this.publisher, this.salesIsActive, this.salesDiscountRate, this.bookPrice,
       this.bookImamge, this.isbn).subscribe((res) => {
      let responseObj = <SearchProducts>res.body;
    })
  }

}
