import { Component, Input, OnInit } from '@angular/core';
import { User } from 'User';
import { LoginService } from '../login.service';
import { LoginComponent } from '../login/login.component';

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
  constructor(private loginService:LoginService) { }
  
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

  ngOnInit(): void {
    this.checkIfLoggedIn();
    // get current signed in user, so it will be used to toggle loggedInTrue and show the user's username
  }
}
