import { Component, OnInit } from '@angular/core';
import {faLightbulb as faSolidLightbulb, faDollarSign, IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb as faRegularLightbulb } from "@fortawesome/free-regular-svg-icons";
import { ThemeService } from "src/app/theme.service";
import { User } from 'User';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faLightbulb!: IconDefinition;

  // For determining where the profile button will send the user, it uses these booleans and *ngIf
  roleIsCustomer:boolean= false;
  roleIsAdmin:boolean = false;

  constructor(private themeService: ThemeService, private loginService:LoginService) { }

  ngOnInit(): void {
    this.setLightbulb();
    this.roleIsCustomer= false;
    this.roleIsAdmin= false;
    this.checkIfLoggedIn();
  }

  setLightbulb() {
    if (this.themeService.isDarkTheme()) {
      this.faLightbulb = faRegularLightbulb;
    } else {
      this.faLightbulb = faSolidLightbulb;
    }
  }

  toggleTheme() {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }

    this.setLightbulb();
  }

  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200 || res.status === 201){ // depending on the status
        let body = <User> res.body;

        if(body.role === 'Customer'){
          this.roleIsCustomer= true;
        }

        if(body.role === 'Admin'){
          this.roleIsAdmin= true;
        }
      }
    },
    (err) => {

    });
  }

}
