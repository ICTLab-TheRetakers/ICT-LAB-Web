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
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Issue[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(issue: Issue): Observable<Issue> {
        return this.http.post(this.baseUrl + 'create', issue)
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(issue: Issue): Observable<Issue> {
        return this.http.put(this.baseUrl + 'update', issue)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?issue=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteFromRoom(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'deleteFromRoom?room=' + room)
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
