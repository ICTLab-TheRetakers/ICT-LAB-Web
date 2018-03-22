import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Notification from '../models/notification.model';

@Injectable()
export class NotificationService {

    private baseUrl = environment.notificationsApi;

    constructor(public http: HttpClient) { }

    get(id: number): Observable<Notification> {
        return this.http.get(this.baseUrl + 'get?notification=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByUser(user: string): Observable<Notification[]> {
        return this.http.get(this.baseUrl + 'getByUser?user=' + user)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(notification: Notification): Observable<Notification> {
        return this.http.post(this.baseUrl + 'create', notification)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?notification=' + id)
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
