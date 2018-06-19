import { Component, OnInit, HostListener } from '@angular/core';
import { SharedService } from './shared/services/shared.service';
import User from './shared/models/user.model';
import { AuthenticationService } from './shared/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    user: User = null;
    isLoggedIn: boolean = false;
    dashboardQR: string;
    isDashboard: boolean = false;

    constructor(private authService: AuthenticationService, private route: ActivatedRoute,
        private router: Router, private _sharedService: SharedService) { }

    ngOnInit() {
        this.checkIfLoggedIn();
        this.checkIfDashboard();
        this._sharedService.clearData();
    }

    checkIfDashboard() {
        if (window.location.pathname.toString().includes('dashboard')) {
            this.isDashboard = true;
            this.dashboardQR = 'http://145.24.222.238/dashboard/'.concat(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1));
        }
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
