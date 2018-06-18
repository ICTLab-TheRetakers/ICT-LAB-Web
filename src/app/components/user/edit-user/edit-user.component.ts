import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { RoleService } from '../../../shared/services/role.service';
import User from '../../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import Role from '../../../shared/models/role.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
    currentUser: User;
    user: User;
    userId: string;
    roles: Role[];

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private _userService: UserService, private _roleService: RoleService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.getCurrentUser();
        this.route.params.subscribe(
            (params) => {
                this.userId = params['user'];
                this.getUser(this.userId);
            }
        );
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    getUser(email: string) {
        this._userService.getById(email).subscribe(
            (response) => {
                this.user = response;
                this.getRoles();
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getRoles() {
        this._roleService.getAll().subscribe(
            (response) => {
                this.roles = response;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    submitForm() {
        this._userService.update(this.user).subscribe(
            (response) => {
                if (response != null) {
                    this.fileUpload();
                }
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    fileUpload(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                this._userService.upload(fileToUpload, this.user).subscribe(
                    (response) => this.router.navigate(['/users']),
                    (error: HttpErrorResponse) => { throw error; }
                );
            }
        } else {
            this.router.navigate(['/users']);
        }
    }

}
