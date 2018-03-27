import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Issue from '../models/issue.model';

@Injectable()
export class IssueService {
    private baseUrl = environment.issueApi;

    constructor(public http: HttpClient) { }

    get(id: number): Observable<Issue> {
        return this.http.get(this.baseUrl + 'get?issue=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Issue[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(res => res)
            .catch(this.handleError);
    }

    create(issue: Issue): Observable<Issue> {
        return this.http.post(this.baseUrl + 'create', issue)
            .map(res => res)
            .catch(this.handleError);
    }

    update(issue: Issue): Observable<Issue> {
        return this.http.put(this.baseUrl + 'update', issue)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?issue=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    deleteFromRoom(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'deleteFromRoom?room=' + room)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
