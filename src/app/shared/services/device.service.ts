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
            .map(this.extractData)
            .catch(this.handleError);
    }

    getByRoom(room: string): Observable<Device[]> {
        return this.http.get(this.baseUrl + 'getByRoom?room=' + room)
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(device: Device): Observable<Device> {
        return this.http.post(this.baseUrl + 'create', device)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(device: number): Observable<boolean> {
        return this.http.delete(this.baseUrl + 'delete?device=' + device)
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
