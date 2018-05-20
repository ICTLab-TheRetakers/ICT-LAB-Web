import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { SelectRoomComponent } from '../../room/select-room/select-room.component';

import Room from '../../../shared/models/room.model';
import Reservation from '../../../shared/models/reservation.model';
import User from '../../../shared/models/user.model';

import * as moment from 'moment';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
    hours: string[] = environment.hours;
    reservation: Reservation = new Reservation();
    selectedRoom: Room = null;
    currentUser: User = null;

    start_date: string;
    start_time: string = '8:30-9:20';
    end_date: string;
    end_time: string = '8:30-9:20';

    constructor(private _reservationService: ReservationService, private router: Router) { }

    ngOnInit() { }

    submitForm() {
        this.convertDatetime();
        this.setReservationInfo();

        this._reservationService.create(this.reservation).subscribe(
            (response) => this.router.navigate(['/reservations']),
            (err) => { return Observable.throw(err); }
        );;
    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;

        setTimeout(() => {
            this.getCurrentUser();
        }, 500);
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    setReservationInfo() {
        this.reservation.room_code = this.selectedRoom.room_code;
        this.reservation.user_id = this.currentUser.user_id;
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

        let start = moment.utc(this.start_date + ' ' + this.start_time);
        let end = moment.utc(this.end_date + ' ' + this.end_time);

        this.reservation.start_time = start.toDate();
        this.reservation.end_time = end.toDate();
    }
}
