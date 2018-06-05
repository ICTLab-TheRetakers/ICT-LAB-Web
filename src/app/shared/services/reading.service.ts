import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Roomreading from '../models/reading.model';

@Injectable()
export class RoomReadingService {
    private baseUrl = environment.readingApi;

    constructor(private http: HttpClient) { }

    get(room: string, type: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?room=' + room + '&type=' + type)
            .catch(this.handleError);
    }

    getByDate(room: string, type: string, from: string, till: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?room=' + room + '&type=' + type
            + '&from=' + from + '&till=' + till)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .catch(this.handleError);
    }

    getByRoomLimit(room: string, limit: number): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room + '&limit=' + limit)
            .catch(this.handleError);
    }

    create(reading: Roomreading): Observable<Roomreading> {
        return this.http.post(this.baseUrl + 'create', reading)
            .catch(this.handleError);
    }

    delete(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
