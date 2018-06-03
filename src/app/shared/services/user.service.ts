import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response, RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import User from '../models/user.model';

@Injectable()
export class UserService {
    private baseUrl = environment.userApi;

    constructor(private http: HttpClient) { }

    getByEmail(email: string): Observable<User> {
        return this.http.get(this.baseUrl + 'getByEmail?email=' + email)
            .catch(this.handleError);
    }

    getById(id: string): Observable<User> {
        return this.http.get(this.baseUrl + 'get?user=' + id)
            .catch(this.handleError);
    }

    checkCredentials(email: string, password: string): Observable<User> {
        return this.http.get(this.baseUrl + 'checkCredentials?email=' + email + '&password=' + password)
            .catch(this.handleError);
    }

    create(user: User): Observable<User> {
        return this.http.post(this.baseUrl + 'create', user)
            .catch(this.handleError);
    }

    update(user: User): Observable<User> {
        return this.http.put(this.baseUrl + 'update', user)
            .catch(this.handleError);
    }

    delete(id: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?user=' + id)
            .catch(this.handleError);
    }

    upload(file: any, user: User): Observable<User> {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("model", JSON.stringify(user));

        return this.http.post(this.baseUrl + 'upload', formData)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
