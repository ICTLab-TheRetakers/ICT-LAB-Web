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
import { HttpErrorResponse } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';

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
    date;

    constructor(private _reservationService: ReservationService, private router: Router, private toastyService: ToastyService) { }

    ngOnInit() {
        this.getCurrentUser();
        this.addRow();
    }

    submitForm() {
        this.reservations.forEach(reservation => {
            this.date = reservation.date.toString();
            if (!moment(this.date).isBetween(moment().subtract(1, 'days'), moment().add(2, 'months'))) {
                this.toastyService.error('You can only reserve a room within two months');

            } else if (reservation.begin > reservation.end) {
                this.toastyService.error('Ending time cannot be earlier than starting time.');
            } else {
                reservation = this.convertDatetime(reservation);
                reservation.room_code = this.selectedRoom.room_code;
                console.log(reservation.begin);
                this._reservationService.create(reservation).subscribe(
                    (response) => this.router.navigate(['/reservations']),
                    (error: HttpErrorResponse) => { throw error; }
                );
            }
        });
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
