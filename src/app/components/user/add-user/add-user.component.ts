import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { RoleService } from '../../../shared/services/role.service';
import User from '../../../shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import Role from '../../../shared/models/role.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
    user: User = new User();
    roles: Role[];

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private _userService: UserService, private _roleService: RoleService, private router: Router) { }

    ngOnInit() {
        this.getRoles();
    }

    getRoles() {
        this._roleService.getAll().subscribe(
            (response) => {
                this.roles = response;
                this.roles = this.roles.filter(f => f.role_id != 1);
            },
            (error) => { return Observable.throw(error); }
        );
    }

    submitForm() {
        this._userService.create(this.user).subscribe(
            (response) => {
                if (response != null) {
                    this.fileUpload();
                }
            },
            (error) => { return Observable.throw(error); }
        );
    }

    fileUpload(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                this._userService.upload(fileToUpload, this.user).subscribe(
                    (response) => this.router.navigate(['/users']),
                    (error) => { return Observable.throw(error); }
                );
            }
        }
    }

}
