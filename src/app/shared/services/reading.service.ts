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

    get(device: number, type: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?device=' + device + '&type=' + type)
            .catch(this.handleError);
    }

    getByDate(device: number, type: string, from: string, till: string): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'get?device=' + device + '&type=' + type
            + '&from=' + from + '&till=' + till)
            .catch(this.handleError);
    }

    getByDevice(device: number): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'getByDevice?device=' + device)
            .catch(this.handleError);
    }

    getByDeviceLimit(device: number, limit: number): Observable<Roomreading[]> {
        return this.http.get(this.baseUrl + 'getByDevice?device=' + device + '&limit=' + limit)
            .catch(this.handleError);
    }

    create(reading: Roomreading): Observable<Roomreading> {
        return this.http.post(this.baseUrl + 'create', reading)
            .catch(this.handleError);
    }

    delete(device: string): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?device=' + device)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
