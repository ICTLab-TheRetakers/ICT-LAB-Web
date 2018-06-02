import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


    firstName = JSON.parse(localStorage.getItem('loggedInUser')).first_name;
    lastName = JSON.parse(localStorage.getItem('loggedInUser')).last_name;
    role = JSON.parse(localStorage.getItem('loggedInUser')).role;
    userId = JSON.parse(localStorage.getItem('loggedInUser')).user_id;

  constructor() { }

  ngOnInit() {
  }

}
