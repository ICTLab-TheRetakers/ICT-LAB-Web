import { Component, OnInit } from '@angular/core';
import User from '../../../shared/models/user.model';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../shared/authentication.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    toastOptions: ToastOptions;
    email: string;
    password: string;
    user: User;

    constructor(private route: ActivatedRoute, private userService: UserService,
        private router: Router, private authenticationService: AuthenticationService, private toastyService: ToastyService) {

        this.toastOptions = {
            title: 'Oops',
            msg: 'You\'ve entered the wrong credentials, please try again!',
            theme: 'bootstrap',
            showClose: true,
            timeout: 4000
        };
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    checkCredentials() {
        this.authenticationService.login(this.email, this.password)
            .subscribe(
            user => {
                localStorage.setItem('loggedInUser', JSON.stringify(user[0] as User));
                this.router.navigate(['/']);
            },
            error => {
                this.toastyService.warning(this.toastOptions);
                return Observable.throw(error);
            });
    }

}
