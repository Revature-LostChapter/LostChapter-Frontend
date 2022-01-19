import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'User';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  username!: string;
  password!: string;
  errorMessage!: string;

  // show / hide password
  hide = true;

  // perform service layer functionality here
  onLoggedIn() {
    this.loginService.login(this.username, this.password).subscribe((res) => {
      if (res.status === 201 || res.status === 200) {
        let body = <User> res.body;
        console.log(res);
        if (body.role === 'Customer'){
          this.router.navigate(['/home']); // navigates to customer route page -> redirecting to this route for now until we have full functionalities of the routes
        }

        if (body.role === 'Admin'){
          this.router.navigate(['/home']); // navigates to admin route page
        }
      }
    },
      (err) => {
        this.errorMessage = err.error;
      });

  }


  checkIfLoggedIn() {
    this.loginService.checkLoginStatus().subscribe(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          // depending on the status
          let body = <User>res.body;

          if (body.role === 'Customer') {
            this.router.navigate(['']);
          }

          if (body.role === 'Admin') {
            this.router.navigate(['/admin']);
          }
        }
      });
  }
}
