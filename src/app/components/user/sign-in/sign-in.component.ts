import { Component, OnInit } from '@angular/core';
import User from '../../../shared/models/user.model';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { AuthenticationService } from '../../../shared/authentication.service';
import { RoleService } from '../../../shared/services/role.service';
import Role from '../../../shared/models/role.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    toastOptions: ToastOptions;
    email: string;
    password: string;

    constructor(private route: ActivatedRoute, private userService: UserService, private roleService: RoleService,
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
        this.authenticationService.login(this.email, this.password).subscribe(
            (response) => {
                this.checkRole(response as User);
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    saveLocal(user: User) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/']);
    }

    checkRole(user: User) {
        this.roleService.getAll().subscribe(
            (response) => {
                user.role = response.filter(f => f.role_id == user.role_id)[0].type;
                this.saveLocal(user);
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
