import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ReservationService } from '../../../shared/services/reservation.service';
import { SelectRoomComponent } from '../../room/select-room/select-room.component';

import Room from '../../../shared/models/room.model';
import Reservation from '../../../shared/models/reservation.model';
import User from '../../../shared/models/user.model';

import * as moment from 'moment';

@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
    hours: string[] = environment.hours;
    reservations: Reservation[] = [];
    selectedRoom: Room = null;
    currentUser: User = null;

    constructor(private _reservationService: ReservationService, private router: Router) { }

    ngOnInit() {
        this.getCurrentUser();
        this.addRow();
    }

    submitForm() {
        this.reservations.forEach(reservation => {
            reservation = this.convertDatetime(reservation);
            reservation.room_code = this.selectedRoom.room_code;
            
            this._reservationService.create(reservation).subscribe(
                (response) => { },
                (err) => { return Observable.throw(err); }
            );
        });

        this.router.navigate(['/reservations']);
    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    }

    addRow() {
        let reservation = new Reservation();
        reservation.user_id = this.currentUser.user_id;

        this.reservations.push(reservation);
    }

    removeRow(index: number) {
        this.reservations = this.reservations.splice(index, 1);
    }

    convertDatetime(reservation: Reservation): Reservation {
        // Convert to datetime string
        let start = moment(reservation.date).format('YYYY-MM-DD') + ' ' + reservation.begin;
        let end = moment(reservation.date).format('YYYY-MM-DD') + ' ' + reservation.end

        // Set reservation start and end time
        reservation.start_time = moment.utc(start).toDate();
        reservation.end_time = moment.utc(end).toDate();

        return reservation;
    }
}
