    import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { RoomService } from '../../shared/services/room.service';
import Room from '../../shared/models/room.model';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    location: string = '';
    rooms: Room[] = [];
    selectedRoom: Room = null;
    toastOptions: ToastOptions;

    constructor(private _roomService: RoomService, private _sharedService: SharedService,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

        //Set toast theme
        this.toastyConfig.theme = 'bootstrap';
        this.toastOptions = {
            title: 'Oops, an error occured',
            msg: 'Unable to retrieve available rooms. Please try again!',
            timeout: 5000,
            showClose: true,
            theme: 'bootstrap'
        };
    }

    ngOnInit() {
        this.getAllRooms();
    }

    findRoomsByLocation(): Room[] {
        return this.rooms.filter(f => f.location.includes(this.location));
    }

    setRoom($event) {
        this.selectedRoom = this.rooms.filter(f => f.room_code == $event.target.value)[0];
        this._sharedService.setData(this.selectedRoom.room_code);
    }

    getAllRooms() {
        this._roomService.getAllRooms().subscribe(
            values => this.rooms = values,
            (err) => {
                this.toastyService.error(this.toastOptions);
            }
        );
    }

}
