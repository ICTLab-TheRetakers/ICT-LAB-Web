import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Role from '../models/role.model';

@Injectable()
export class RoleService {

    private baseUrl = environment.roleApi;

    constructor(public http: HttpClient) { }

    get(id: number): Observable<Role> {
        return this.http.get(this.baseUrl + 'get?role=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAll(): Observable<Role[]> {
        return this.http.get(this.baseUrl + 'get')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
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
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
