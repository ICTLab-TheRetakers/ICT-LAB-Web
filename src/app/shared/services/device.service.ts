import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import Device from '../models/device.model';

@Injectable()
export class DeviceService {
    private baseUrl = environment.deviceApi;

    constructor(public http: HttpClient) { }

    get(id: number): Observable<Device> {
        return this.http.get(this.baseUrl + 'get?device=' + id)
            .map(res => res)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Device[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(res => res)
            .catch(this.handleError);
    }

    create(device: Device): Observable<Device> {
        return this.http.post(this.baseUrl + 'create', device)
            .map(res => res)
            .catch(this.handleError);
    }

    delete(device: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?device=' + device)
            .map(res => res)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error());
    }
}
