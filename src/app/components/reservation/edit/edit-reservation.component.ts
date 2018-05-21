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

    hours: string[] = environment.hours;
    reservation: Reservation;
    currentUser: User = null;

    date: string;
    start_time: string;
    end_time: string;

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

    setDatetime() {
        this.date = this.reservation.start_time.toString().split('T')[0];
        this.start_time = this.reservation.start_time.toString().split('T')[1];
        this.end_time = this.reservation.end_time.toString().split('T')[1];

        // Get lesson time
        this.start_time = this.hours.filter(f => f.split('-')[0] == this.start_time)[0];
        this.end_time = this.hours.filter(f => f.split('-')[1] == this.end_time)[0];
    }

    getReservation() {
        this._reservationService.getByStart(this.userId, this.start).subscribe(
            (response) => {
                this.reservation = response;
                this.getCurrentUser();
            },
            (err) => { return Observable.throw(err); }
        );
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    convertDatetime() {
        this.start_time = this.start_time.split('-')[0];
        this.end_time = this.end_time.split('-')[1];

        // Add leading zero to time
        if (this.start_time.substr(0, 1) != '1' || this.start_time.substr(0, 1) != '2') {
            this.start_time = '0' + this.start_time;
        }
        if (this.end_time.substr(0, 1) != '1' || this.end_time.substr(0, 1) != '2') {
            this.end_time = '0' + this.end_time;
        }

        let start = moment.utc(this.date + ' ' + this.start_time);
        let end = moment.utc(this.date + ' ' + this.end_time);

        this.reservation.start_time = start.toDate();
        this.reservation.end_time = end.toDate();
    }
}
