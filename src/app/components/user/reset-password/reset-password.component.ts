import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    email: string;
    toastOptions: ToastOptions;

    constructor(private _userService: UserService, private router: Router, private toastyService: ToastyService) {
        this.toastOptions = {
            title: '',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000,
            onRemove: () => {
                this.router.navigate(['/login']);
            }
        };
    }

    ngOnInit() {
    }

    showSuccess() {
        this.toastOptions.title = 'Success';
        this.toastOptions.msg = 'An e-mail has been sent to this e-mail address.';

        this.toastyService.success(this.toastOptions);
    }

    resetPassword() {
        this._userService.resetPassword(this.email).subscribe(
            (response) => this.showSuccess(),
            (error) => { throw error; }
        );
    }

}
