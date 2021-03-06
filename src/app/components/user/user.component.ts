import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationResult } from '../../shared/models/pagination.result';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users: User[];
    pagedResult: PaginationResult<User>;

    constructor(private _userService: UserService) { }

    ngOnInit() {
        this.getPage(1);
    }

    getPage(page: number) {
        this._userService.index(page).subscribe(
            (response) => {
                this.pagedResult = response;
                this.users = this.pagedResult.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    deleteUser(id: string) {
        if (confirm('Are you sure you want to delete this user?')) {
            this._userService.delete(id).subscribe(
                (response) => this.ngOnInit(),
                (error: HttpErrorResponse) => { throw error; }
            );
        }
    }
}
