import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Reservation from '../models/reservation.model';
import Schedule from '../models/schedule/schedule.model';

@Injectable()
export class ReservationService {
    private baseUrl = environment.reservationApi;

    constructor(private http: HttpClient) { }

    get(user: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user)
            .catch(this.handleError);
    }

    getByDate(user: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user + '&from=' + from + '&till=' + till)
            .catch(this.handleError);
    }

    getByStart(user: string, start: string): Observable<Reservation> {
        return this.http.get(this.baseUrl + 'getByStart?user=' + user + '&start=' + start)
            .catch(this.handleError);
    }

    getAllTeachers(department: string, quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllTeachers?department=' + department + '&quarter=' + quarter)
            .catch(this.handleError);
    }

    getAllRooms(department: string, quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllRooms?department=' + department + '&quarter=' + quarter)
            .catch(this.handleError);
    }

    getAllClasses(department: string, quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllClasses?department=' + department + '&quarter=' + quarter)
            .catch(this.handleError);
    }

    getLessonsByWeek(type: string, index: string, department: string, quarter: number, week: number): Observable<Schedule> {
        return this.http.get(this.baseUrl + 'getLessonsByWeek?type=' + type + '&index=' + index + '&department=' + department + '&week=' + week + '&quarter=' + quarter)
            .map(res => res)
            .catch(this.handleError);
    }

    getByRoomAndDate(room: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room + '&from=' + from + '&till=' + till)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .catch(this.handleError);
    }

    create(reservation: Reservation): Observable<Reservation> {
        return this.http.post(this.baseUrl + 'create', reservation)
            .catch(this.handleError);
    }

    update(reservation: Reservation): Observable<Reservation> {
        return this.http.put(this.baseUrl + 'update', reservation)
            .catch(this.handleError);
    }

    delete(room: string, start: string): Observable<Reservation[]> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room + '&start=' + start)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
