import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indexnavbar',
  templateUrl: './indexnavbar.component.html',
  styleUrls: ['./indexnavbar.component.css']
})
export class IndexnavbarComponent implements OnInit {
  loggedInTrue:boolean= true;
  constructor() { }




  ngOnInit(): void {
    // get current signed in user, so it will be used to toggle loggedInTrue and show the user's username
  }
}
