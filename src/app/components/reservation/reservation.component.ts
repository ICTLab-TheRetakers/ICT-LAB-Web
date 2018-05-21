import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ReservationService } from '../../shared/services/reservation.service';

import User from '../../shared/models/user.model';
import Reservation from '../../shared/models/reservation.model';

import * as moment from 'moment';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
    currentUser: User;
    reservations: Reservation[];

    constructor(private _reservationService: ReservationService) { }

    ngOnInit() {
        this.getCurrentUser();
        this.getReservationsByUser();
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    getReservationsByUser() {
        this._reservationService.get(this.currentUser.user_id).subscribe(
            (response) => this.reservations = response,
            (err) => { return Observable.throw(err); }
        );
    }

    deleteReservation(room: string, start_time: Date) {
        this._reservationService.delete(room, moment(start_time).format('yyyy-MM-dd HH:mm:ss')).subscribe(
            (response) => { },
            (err) => { return Observable.throw(err); }
        );
    }

}
