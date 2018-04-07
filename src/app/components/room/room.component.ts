import { Component, OnInit } from '@angular/core';

import Room from '../../shared/models/room.model';

import { RoomService } from '../../shared/services/room.service';
import { SharedService } from '../../shared/services/shared.service';

import { SelectRoomComponent } from './select-room/select-room.component';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    selectedRoom: Room = null;

    constructor(private _roomService: RoomService) {}

    ngOnInit() {}

    getRoomChoice(event: any) {
        this.selectedRoom = event;
    }
}
