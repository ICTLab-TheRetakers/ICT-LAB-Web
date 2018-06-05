import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Issue from '../models/issue.model';

@Injectable()
export class IssueService {
    private baseUrl = environment.issueApi;

    constructor(private http: HttpClient) { }

    get(id: number): Observable<Issue> {
        return this.http.get(this.baseUrl + 'get?issue=' + id)
            .catch(this.handleError);
    }

    getAll(): Observable<Issue[]> {
        return this.http.get(this.baseUrl + 'getAll')
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Issue[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .catch(this.handleError);
    }

    create(issue: Issue): Observable<Issue> {
        return this.http.post(this.baseUrl + 'create', issue)
            .catch(this.handleError);
    }

    update(issue: Issue): Observable<Issue> {
        return this.http.put(this.baseUrl + 'update', issue)
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?issue=' + id)
            .catch(this.handleError);
    }

    deleteFromRoom(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'deleteFromRoom?room=' + room)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
