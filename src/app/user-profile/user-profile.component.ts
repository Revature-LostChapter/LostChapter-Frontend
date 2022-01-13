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
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  age!: number;
  email!: string;
  birthday!: string;
  address!: string;
  role!: string;

  // succssmessage
  successMessage!: string;

  // err message
  errorMessage!: string;

  currentUser!: User;

  async getLoggedUser() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200) {
        let body = <User>res.body;
        this.currentUser = body;
        console.log(this.currentUser);
      }
      else {

        console.log(res);

      }

    });
  }
  public settingUser(newUser: User): void {}

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.getLoggedUser();
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

        console.log(res.body);

      });
  }
}
