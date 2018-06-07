import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import User from './models/user.model';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/share';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AuthenticationService {

    constructor(private userService: UserService, private router: Router) { }

    login(email: string, password: string): any {
        return this.userService.checkCredentials(email, password)
            .catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('loggedInUser');
    }

    private handleError(error) {
        return Observable.throw(error);
    }


}
