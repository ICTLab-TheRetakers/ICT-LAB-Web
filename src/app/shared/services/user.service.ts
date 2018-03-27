import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import User from '../models/user.model';

@Injectable()
export class UserService {

    private baseUrl = environment.userApi;

    constructor(public http: HttpClient) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get(this.baseUrl + 'getByEmail?email=' + email)
            .map(res => res)
            .catch(this.handleError);
    }

    getById(id: string): Observable<User> {
        return this.http.get(this.baseUrl + 'get?user=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    checkCredentials(email: string, password: string): Observable<boolean> {
        return this.http.get(this.baseUrl + 'checkCredentials?email=' + email + '&password=' + password)
            .map(res => res)
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
        return this.http.post(this.baseUrl + 'create', user)
            .map(res => res)
            .catch(this.handleError);
    }

    update(user: User): Observable<User> {
        return this.http.put(this.baseUrl + 'update', user)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?user=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError(error) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
