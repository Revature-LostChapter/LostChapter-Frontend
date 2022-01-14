import { Component,  EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDividerModule} from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
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

  constructor(private loginService: LoginService, private router: Router, public dialog: MatDialog) { }

  // selectedProducts!: SearchProducts;
  
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


  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

}
