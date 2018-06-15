import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { ReservationService } from '../../shared/services/reservation.service';

import User from '../../shared/models/user.model';
import Reservation from '../../shared/models/reservation.model';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationResult } from '../../shared/models/pagination.result';

@Component({
    selector: 'app-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
    currentUser: User;
    reservations: Reservation[];
    pagedResult: PaginationResult<Reservation>;

    constructor(private _reservationService: ReservationService) { }

    ngOnInit() {
        this.getCurrentUser();
        this.getPage(1);
    }

    getPage(page: number) {
        this._reservationService.index(this.currentUser.user_id, page).subscribe(
            (response) => {
                this.pagedResult = response;
                this.reservations = this.pagedResult.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    }

    deleteReservation(id: number) {
        if (confirm('Are you sure you want to delete this reservation?')) {
            this._reservationService.delete(id).subscribe(
                (response) => this.ngOnInit(),
                (error: HttpErrorResponse) => { throw error; }
            );
        }
    }

}
