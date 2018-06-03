import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import User from '../../shared/models/user.model';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    user: User;

    constructor() { }

    ngOnInit() {
        this.getCurrentUser();
    }

    getCurrentUser() {
        this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    }

}
