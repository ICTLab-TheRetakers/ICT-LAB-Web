import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Department from '../models/department.model';

@Injectable()
export class DepartmentService {
    private baseUrl = environment.departmentApi;

    constructor(private http: HttpClient) { }

    get(code: string): Observable<Department> {
        return this.http.get(this.baseUrl + 'get?code=' + code)
            .catch(this.handleError);
    }

    getAll(): Observable<Department[]> {
        return this.http.get(this.baseUrl + 'getAll')
            .catch(this.handleError);
    }

    getByName(name: string): Observable<Department> {
        return this.http.get(this.baseUrl + 'getByName?name=' + name)
            .catch(this.handleError);
    }

    create(department: Department): Observable<Department> {
        return this.http.post(this.baseUrl + 'create', department)
            .catch(this.handleError);
    }

    update(department: Department): Observable<Department> {
        return this.http.put(this.baseUrl + 'update', department)
            .catch(this.handleError);
    }

    delete(code: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?code=' + code)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
