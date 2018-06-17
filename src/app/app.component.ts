import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import User from './shared/models/user.model';
import { AuthenticationService } from './shared/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    user: User = null;
    isLoggedIn: boolean = false;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute,
        private router: Router, private _sharedService: SharedService) { }

    ngOnInit() {
        this.checkIfLoggedIn();
        this._sharedService.clearData();
    }

    checkIfLoggedIn() {
        this.user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (this.user != null) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    signOut() {
        this.authService.logout();
        this.checkIfLoggedIn();

        if (!this.isLoggedIn) {
            this.router.navigate(['/login']);
        }
    }
}
