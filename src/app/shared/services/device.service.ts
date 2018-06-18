import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import Device from '../models/device.model';

@Injectable()
export class DeviceService {
    private baseUrl = environment.deviceApi;

    constructor(private http: HttpClient) { }

    get(id: number): Observable<Device> {
        return this.http.get(this.baseUrl + 'get?device=' + id)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Device[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .catch(this.handleError);
    }

    create(device: any): Observable<Device> {
        return this.http.post(this.baseUrl + 'create', device)
            .catch(this.handleError);
    }

    delete(device: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?device=' + device)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}
