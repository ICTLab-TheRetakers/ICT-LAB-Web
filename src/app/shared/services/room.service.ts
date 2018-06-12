import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import { PaginationResult } from '../../shared/models/pagination.result';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Room from '../models/room.model';

@Injectable()
export class RoomService {
    private baseUrl = environment.roomApi;

    constructor(private http: HttpClient) { }

    get(room: string): Observable<Room> {
        return this.http.get(this.baseUrl + 'get?room=' + room)
            .catch(this.handleError);
    }

    pagination(page: number, pageSize: number = 10): Observable<PaginationResult<Room>> {
        return this.http.get(this.baseUrl + 'get?page=' + page + '&pageSize=' + pageSize)
            .catch(this.handleError);
    }

    getAllRooms(): Observable<Room[]> {
        return this.http.get(this.baseUrl + 'getAll')
            .catch(this.handleError);
    }

    create(room: Room): Observable<Room> {
        return this.http.post(this.baseUrl + 'create', room)
            .catch(this.handleError);
    }

    update(room: Room): Observable<Room> {
        return this.http.put(this.baseUrl + 'update', room)
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
