import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'User';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  /*currentUser: User = {
    /*  id: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    age: 0,
    email: '',
    birthday: '',
    address: '',
    role: '',
  }; */
  currentUser!: User;

  async getLoggedUser() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      console.log(res);
      if (res.status === 200) {
        let body = <User>res.body;
        this.currentUser = body;
        console.log(this.currentUser);
      }
    });
    console.log();
  }
  public settingUser(newUser: User): void {}

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }
}
