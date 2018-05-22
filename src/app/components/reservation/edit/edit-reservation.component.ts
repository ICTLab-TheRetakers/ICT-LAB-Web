import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ReservationService } from '../../../shared/services/reservation.service';
import { RoomService } from '../../../shared/services/room.service';
import { SelectRoomComponent } from '../../room/select-room/select-room.component';

import Room from '../../../shared/models/room.model';
import Reservation from '../../../shared/models/reservation.model';
import User from '../../../shared/models/user.model';

import * as moment from 'moment';

@Component({
    selector: 'app-edit-reservation',
    templateUrl: './edit-reservation.component.html',
    styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {
    roomCode: string;
    start: string;
    userId: string;

    date: string;
    hours: string[] = environment.hours;
    reservation: Reservation;
    currentUser: User = null;

    constructor(private _reservationService: ReservationService, private _roomService: RoomService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.userId = params['user'];
                this.roomCode = params['room'];
                this.start = params['start'];

                this.getReservation();
            }
        );
    }

    submitForm() {
        this.convertDatetime();

        this._reservationService.update(this.reservation).subscribe(
            (response) => this.router.navigate(['/reservations']),
            (err) => { return Observable.throw(err); }
        );
    }

    getReservation() {
        this._reservationService.getByStart(this.userId, this.start).subscribe(
            (response) => {
                this.reservation = response;
                this.getCurrentUser();
                this.setDatetime();
            },
            (err) => { return Observable.throw(err); }
        );
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    convertDatetime() {
        // Convert to datetime string
        let start = this.date + ' ' + this.reservation.begin;
        let end = this.date + ' ' + this.reservation.end

        // Set reservation start and end time
        this.reservation.start_time = moment.utc(start).toDate();
        this.reservation.end_time = moment.utc(end).toDate();

        return this.reservation;
    }

    setDatetime() {
        this.date = moment(new Date(this.reservation.start_time.toString().split('T')[0])).format('YYYY-MM-DD');
        this.reservation.begin = this.reservation.start_time.toString().split('T')[1];
        this.reservation.end = this.reservation.end_time.toString().split('T')[1];
    }
}
