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

  showBook!: SearchProducts;

  updateBooksClick(){
    this.adminService.updateBooks(this.bookId, this.updateBook.bookName, this.updateBook.synopsis, this.updateBook.author, this.updateBook.genre.id, this.updateBook.quantity,
      this.updateBook.year, this.updateBook.edition, this.updateBook.publisher, this.updateBook.saleIsActive, this.updateBook.saleDiscountRate, this.updateBook.bookPrice,
       this.updateBook.bookImage, this.updateBook.isbn).subscribe((res) => {
         if(res.status === 200){
          this.successMessage = 'Update is Successful';
          let responseObj = <SearchProducts>res.body;
          this.showBook = responseObj;
         }

    },
    (err) => {
      this.errorMessage = err.error;
    });
  }

}
