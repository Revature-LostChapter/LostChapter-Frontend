import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  // to be implemented later
  Roles: any = ['Admin', 'User'];
  firstname!: string;
  lastname!: string;
  age!: number;
  username!: string;
  email!: string;
  password!: string;

  ngOnInit(): void {
  }

  //service layer here
  submit() {

  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}
