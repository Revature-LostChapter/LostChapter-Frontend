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
  constructor(private router: Router, private loginService: LoginService) {}

  // succssmessage
  successMessage!: string;

  // err message
  errorMessage!: string;

  currentUser!: User;

  getLoggedUser() {
    this.loginService.checkLoginStatus().subscribe((res) => {
      if (res.status === 200) {
        let body = <User>res.body;
        this.currentUser = body;
      } else {
      }
    });
  }
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
        if (res.status === 200) {
          this.successMessage = 'Your update is successful';
          let body = <User>res.body;
          this.currentUser = body;
        }
      },
      (err) => {
        this.errorMessage = '';
        this.errorMessage = err.error;

      });
  }
}
