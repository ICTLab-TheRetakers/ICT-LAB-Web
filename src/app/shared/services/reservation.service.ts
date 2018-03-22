import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Reservation from '../models/reservation.model';

@Injectable()
export class ReservationService {

    private baseUrl = environment.reservationApi;

    constructor(public http: HttpClient) { }

    get(user: string): Observable<Reservation> {
        return this.http.get(this.baseUrl + 'get?user=' + user)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByDate(user: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user + '&from=' + from + '&till=' + till)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByRoomAndDate(room: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room + '&from=' + from + '&till=' + till)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(reservation: Reservation): Observable<Reservation> {
        return this.http.post(this.baseUrl + 'create', reservation)
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(reservation: Reservation): Observable<Reservation> {
        return this.http.put(this.baseUrl + 'update', reservation)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(room: string, start: string): Observable<Reservation[]> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room + '&start=' + start)
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
