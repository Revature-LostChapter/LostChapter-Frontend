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

  ngOnInit(): void {
  }

}
