import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Roomreading from '../models/reading.model';

@Injectable()
export class RoomreadingService {

    private baseUrl = environment.readingApi;

    constructor(public http: HttpClient) { }

    get(room: string, type: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?room=' + room + '&type=' + type)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByDate(room: string, type: string, from: string, till: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?room=' + room + '&type=' + type
            + '&from=' + from + '&till=' + till)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(reading: Roomreading): Observable<Roomreading> {
        return this.http.post(this.baseUrl + 'create', reading)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room)
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
