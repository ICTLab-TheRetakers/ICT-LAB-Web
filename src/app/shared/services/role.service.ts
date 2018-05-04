import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Role from '../models/role.model';

@Injectable()
export class RoleService {
    private baseUrl = environment.roleApi;

    constructor(private http: HttpClient) { }

    get(id: number): Observable<Role> {
        return this.http.get(this.baseUrl + 'get?role=' + id)
            .catch(this.handleError);
    }

    getAll(): Observable<Role[]> {
        return this.http.get(this.baseUrl + 'getAll')
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    } 
}
