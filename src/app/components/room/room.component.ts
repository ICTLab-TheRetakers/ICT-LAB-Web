import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { RoomService } from '../../shared/services/room.service';
import Room from '../../shared/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    location: string = '';
    rooms: Room[] = [];
    currentRoom: Room;
    availableRooms: string;

    constructor(private _roomService: RoomService, private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {

        //Set toast theme
        this.toastyConfig.theme = 'bootstrap';
    }

    ngOnInit() {
        this.getAllRooms();
    }

    findRoomsByLocation(): Room[] {
        return this.rooms.filter(f => f.location.includes(this.location));
    }

    selectRoom() {
        this.currentRoom = this.rooms.filter(f => f.room_code == this.availableRooms)[0];
    }

    getAllRooms() {
        this._roomService.getAllRooms().subscribe(
            values => this.rooms = values,
            (err) => {
                this.toastyService.error({
                    title: 'Oops, an error occured',
                    msg: 'Unable to retrieve the available rooms. Please try again!',
                    timeout: 5000,
                    showClose: true,
                    theme: 'bootstrap'
                });
            }
        );
    }

}
