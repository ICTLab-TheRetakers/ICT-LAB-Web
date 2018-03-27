import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Room from '../models/room.model';

@Injectable()
export class RoomService {
    private baseUrl = environment.roomApi;

    constructor(public http: HttpClient) { }

    get(room: string): Observable<Room> {
        return this.http.get(this.baseUrl + 'get?room=' + room)
            .map(res => res)
            .catch(this.handleError);
    }

    getByLocation(location: string): Observable<Room[]> {
        return this.http.get(this.baseUrl + 'getByLocation?location=' + location)
            .map(res => res)
            .catch(this.handleError);
    }

    create(room: Room): Observable<Room> {
        return this.http.post(this.baseUrl + 'create', room)
            .map(res => res)
            .catch(this.handleError);
    }

    update(room: Room): Observable<Room> {
        return this.http.put(this.baseUrl + 'update', room)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(room: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?room=' + room)
            .map(res => res)
            .catch(this.handleError);
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
        console.log(errMsg);
        return Observable.throw(errMsg);
    }
}
