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
            .map(res => res)
            .catch(this.handleError);
    }

    getByUser(user: string): Observable<Notification[]> {
        return this.http.get(this.baseUrl + 'getByUser?user=' + user)
            .map(res => res)
            .catch(this.handleError);
    }

    create(notification: Notification): Observable<Notification> {
        return this.http.post(this.baseUrl + 'create', notification)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?notification=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
