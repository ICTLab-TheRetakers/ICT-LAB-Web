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
import { PaginationResult } from '../models/pagination.result';

@Injectable()
export class ReservationService {
    private baseUrl = environment.reservationApi;

    constructor(private http: HttpClient) { }

    get(user: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user)
            .catch(this.handleError);
    }

    getByUserIdAndDates(user: string, from: string, till: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'get?user=' + user + '&from=' + from + '&till=' + till)
            .catch(this.handleError);
    }

    index(user: string, page: number, pageSize: number = 10): Observable<PaginationResult<Reservation>> {
        return this.http.get(this.baseUrl + 'index?user=' + user + '&page=' + page + '&pageSize=' + pageSize)
            .catch(this.handleError);
    }

    indexByRoom(room: string, page: number, pageSize: number = 10): Observable<PaginationResult<Reservation>> {
        return this.http.get(this.baseUrl + 'indexByRoom?room=' + room + '&page=' + page + '&pageSize=' + pageSize)
            .catch(this.handleError);
    }

    getAll(): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getAll')
            .catch(this.handleError);
    }

    getByDate(start: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getByDate?date=' + start)
            .catch(this.handleError);
    }

    getBetweenDates(start: string, end: string): Observable<Reservation[]> {
        return this.http.get(this.baseUrl + 'getBetweenDates?start=' + start + '&end=' + end)
            .catch(this.handleError);
    }

    getByStart(user: string, start: string): Observable<Reservation> {
        return this.http.get(this.baseUrl + 'getByStart?user=' + user + '&start=' + start)
            .catch(this.handleError);
    }

    getAllTeachers(quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllTeachers?quarter=' + quarter)
            .catch(this.handleError);
    }

    getAllRooms(quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllRooms?quarter=' + quarter)
            .catch(this.handleError);
    }

    getAllClasses(quarter: number): Observable<string[]> {
        return this.http.get(this.baseUrl + 'getAllClasses?quarter=' + quarter)
            .catch(this.handleError);
    }

    getLessonsByWeek(type: string, index: string, quarter: number, week: number): Observable<Schedule> {
        return this.http.get(this.baseUrl + 'getLessonsByWeek?type=' + type + '&index=' + index + '&week=' + week + '&quarter=' + quarter)
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

    getById(id: number): Observable<Reservation> {
        return this.http.get(this.baseUrl + 'getById?reservation=' + id)
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

    delete(id: number): Observable<Reservation[]> {
        return this.http.delete(this.baseUrl + 'delete?reservation=' + id)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
