import { Component, OnInit } from '@angular/core';
import Room from '../../../shared/models/room.model';
import { SelectRoomComponent } from '../../room/select-room/select-room.component';
import Reservation from '../../../shared/models/reservation.model';
import User from '../../../shared/models/user.model';

@Component({
    selector: 'app-add-reservation',
    templateUrl: './add-reservation.component.html',
    styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
    selectedRoom: Room = null;
    reservation: Reservation = new Reservation();
    currentUser: User = null;

    constructor() { }

    ngOnInit() { }

    submitForm() {

    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;

        setTimeout(() => {
            this.getCurrentUser();
        }, 500);
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
        this.setReservationInfo();
    }

    setReservationInfo() {
        this.reservation.room_code = this.selectedRoom.room_code;
        this.reservation.user_id = this.currentUser.user_id;
    }
}
