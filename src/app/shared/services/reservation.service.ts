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
            .map(res => res)
            .catch(this.handleError);
    }

    getByDate(user: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user + '&from=' + from + '&till=' + till)
            .map(res => res)
            .catch(this.handleError);
    }

    getByRoomAndDate(room: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room + '&from=' + from + '&till=' + till)
            .map(res => res)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(res => res)
            .catch(this.handleError);
    }

    create(reservation: Reservation): Observable<Reservation> {
        return this.http.post(this.baseUrl + 'create', reservation)
            .map(res => res)
            .catch(this.handleError);
    }

    update(reservation: Reservation): Observable<Reservation> {
        return this.http.put(this.baseUrl + 'update', reservation)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(room: string, start: string): Observable<Reservation[]> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room + '&start=' + start)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    } 
}
