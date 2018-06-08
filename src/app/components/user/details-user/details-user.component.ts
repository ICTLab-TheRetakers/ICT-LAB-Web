import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../shared/services/user.service';
import { RoleService } from '../../../shared/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

import User from '../../../shared/models/user.model';
import Role from '../../../shared/models/role.model';

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
    user: User;
    userId: string;
    roles: Role[];

    constructor(private _userService: UserService, private _roleService: RoleService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.userId = params['user'];
                this.getUser(this.userId);
            }
        );
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
            (response) => this.roles = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }
}
