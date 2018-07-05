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
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
    toastOptions: ToastOptions;
    hours: string[] = environment.hours;
    reservations: Reservation[] = [];
    selectedRoom: Room = null;
    currentUser: User = null;
    minDate: string;
    maxDate: string;
    date;
    reservationLimit: boolean;

    constructor(private _reservationService: ReservationService, private router: Router, private toastyService: ToastyService) {
        this.toastOptions = {
            title: 'Error',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 7000
        };
    }

    ngOnInit() {
        this.getCurrentUser();
        this.setMinAndMaxDate();
        this.addRow();
    }

    setMinAndMaxDate() {
        let today = new Date();
        this.minDate = today.toJSON().split('T')[0];

        today.setMonth(today.getMonth() + 2);
        this.maxDate = today.toJSON().split('T')[0];
    }

    submitForm() {
        let errorCount = 0;
        this.reservations.forEach(reservation => {
            // Check if hours are valid
            var validStart = false;
            var validEnd = false;

            this.hours.forEach(hour => {
                if (hour.startsWith(reservation.begin))
                    validStart = true;

                if (hour.endsWith(reservation.end))
                    validEnd = true;
            })

            // Check if input values are valid
            this.date = reservation.date.toString();
            if (!moment(this.date).isBetween(moment().subtract(1, 'days'), moment().add(2, 'months'))) {
                this.toastOptions.msg = 'You can only reserve a room within two months!';
                this.toastyService.error(this.toastOptions);

            } else if (reservation.begin > reservation.end) {
                this.toastOptions.msg = 'Start time cannot be later than end time.';
                this.toastyService.error(this.toastOptions);
            } else if (!validStart || !validEnd) {
                this.toastOptions.msg = 'Please use a start / end time that is used for regular hours';
                this.toastyService.error(this.toastOptions);
            } else {
                reservation = this.convertDatetime(reservation);
                reservation.room_code = this.selectedRoom.room_code;

                // Check if reservation not exists, if so, then save reservation
                this.checkIfReservationExists(reservation);
            }
        });

        setTimeout(() => { this.router.navigate(['/reservations']); }, 1500);
    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    addRow() {
        let reservation = new Reservation();
        reservation.user_id = this.currentUser.user_id;
        reservation.date = this.minDate;

        this.reservations.push(reservation);
        this.checkReservationLimit();

    }

    checkReservationLimit() {
        if (this.reservations.length >= 5) {
            this.reservationLimit = true;
        } else {
            this.reservationLimit = false;
        }
    }

    removeRow(index: number) {
        this.reservations.splice(index, 1);
       this.checkReservationLimit();
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

    saveReservation(reservation: Reservation) {
        this._reservationService.create(reservation).subscribe(
            (response) => { },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    checkIfReservationExists(reservation: Reservation) {
        this._reservationService.checkIfExists(reservation).subscribe(
            (response) => {
                if (response == false) {
                    this.saveReservation(reservation);
                } else {
                    this.toastOptions.msg = 'The reservation on \'' + moment(reservation.date).format('MMMM Do') + ' at ' + reservation.begin
                        + '\' is already taken. Please choose a different time or room!';
                    this.toastyService.error(this.toastOptions);
                }
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }
}
