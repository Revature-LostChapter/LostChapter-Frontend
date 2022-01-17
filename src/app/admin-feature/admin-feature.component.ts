import { Component,  EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { SearchProducts } from 'SearchProduct';
import { DisplayProductModalComponent } from '../display-product-modal/display-product-modal.component';
import { LoginService } from '../login.service';
import { User } from 'User';
import { SearchProductsService } from '../search-products.service';

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

  // success message
  successMessage!: string;

  // error message
  errorMessage!: string;

  currentUser!: User;
  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) { }

  async getLoggedUser() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200) {
        let body = <User>res.body;
        this.currentUser = body;
        console.log(this.currentUser);
      } else {
        console.log(res);
      }
    });
  }
  public settingUser(newUser: User): void {}
  
  // Checking if the current user is a admin, if they're not then it redirects them to profile
  // User profile should have a checking like this to redirect to their appropriate profile page based on their role
  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200 || res.status === 201){ // depending on the status
        let body = <User> res.body;

        if(body.role === 'Customer'){
          this.router.navigate(['']);
        }
        
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


  ngOnInit(): void {
    this.checkIfLoggedIn();
    this.getLoggedUser();
  }

}
