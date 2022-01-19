import { Component,  EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { LoginService } from '../login.service';
import { User } from 'User';
import { SearchProductsService } from '../search-products.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-feature',
  templateUrl: './admin-feature.component.html',
  styleUrls: ['./admin-feature.component.css']
})
export class AdminFeatureComponent implements OnInit {

  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  birthday!: string;
  address!: string;
  role!: string;

  bookId!: number;
  bookName!: string;
  synoposis!: string;
  author!: string;
  genre!: number;
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

  // success message
  successMessage!: string;

  // error message
  errorMessage!: string;

  currentUser!: User;

  // variables for quantity
  options!: FormGroup;
  quantityControl = new FormControl(10, Validators.min(1));

  // variables for year
  yearControl = new FormControl(1500,Validators.min(1000))

  // variables for edition
  editionControl = new FormControl(1,Validators.min(1))

  // variables for sale
  isOnSale = false;
  saleControl = new FormControl(.10, Validators.min(.10))
  // maxSaleControl = new FormControl(.10, Validators.max(.90))


  constructor(private searchProductService: SearchProductsService, private route: ActivatedRoute, private adminService: AdminService, private loginService: LoginService, private router: Router, public dialog: MatDialog, fb: FormBuilder) {
    this.options = fb.group({
      selectedQuantity: this.quantityControl,
      yearPublished: this.yearControl,
      bookEdition: this.editionControl,
      minSaleAmount: this.saleControl,
      // maxSaleAmount: this.maxSaleControl,
    });
  }

  async getLoggedUser() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200) {
        let body = <User>res.body;
        this.currentUser = body;
      } else {
      }
    });
  }
  public settingUser(newUser: User): void {}

  // Checking if the current user is a admin, if they're not then it redirects them to profile
  // User profile should have a checking like this to redirect to their appropriate profile page based on their role
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

  onUpdateClick() {
    this.loginService
      .updateUser(
        this.currentUser.username,
        this.currentUser.password,
        this.currentUser.firstName,
        this.currentUser.lastName,
        this.currentUser.age,
        this.currentUser.email,
        this.currentUser.birthday,
        this.currentUser.address,
        this.currentUser.role
      )
      .subscribe((res) => {
        if (res.status === 200) {
          this.successMessage = 'Your update is successful';
          setTimeout(() => window.location.reload(), 200);
          this.router.navigate(['user-profile']);
        }
        console.log(res.body);
      });
  }

  addBooksProd!: SearchProducts;

  updateBooksClick(){
    this.adminService.updateBooks(this.bookId, this.bookName, this.synoposis, this.author, this.genre,  this.quantity,
      this.year, this.edition, this.publisher, this.salesIsActive, this.salesDiscountRate, this.bookPrice,
       this.bookImamge, this.isbn).subscribe((res) => {
      let responseObj = <SearchProducts>res.body;
      this.addBooksProd = responseObj;
    })
  }
  private sub: any;


  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.getLoggedUser();
    this.sub = this.route.params.subscribe(params => {
      this.bookId = params[`bookId`];
      this.getBookById();
    })
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

}
