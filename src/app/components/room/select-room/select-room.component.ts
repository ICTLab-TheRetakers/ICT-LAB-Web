import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Room from '../../../shared/models/room.model';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';

import { RoomService } from '../../../shared/services/room.service';

@Component({
    selector: 'app-select-room',
    templateUrl: './select-room.component.html',
    styleUrls: ['./select-room.component.css']
})
export class SelectRoomComponent implements OnInit {
    location: string = '';
    rooms: Room[] = [];
    selectedRoom: Room = null;
    toastOptions: ToastOptions;

    @Output() chosenRoom = new EventEmitter<Room>();

    constructor(private _roomService: RoomService, private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {

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

    setRoom(event: any) {
        this.selectedRoom = this.rooms.filter(f => f.room_code == event.target.value)[0];
        this.chosenRoom.emit(this.selectedRoom);
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
