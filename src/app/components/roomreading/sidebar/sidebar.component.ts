import { Component, OnInit, Input } from '@angular/core';
import Roomreading from '../../../shared/models/reading.model';
import { RoomService } from '../../../shared/services/room.service';
import Room from '../../../shared/models/room.model';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    roomCode: string;
    room: Room = null;
    readings: Roomreading[];

    constructor(private _roomService: RoomService, private _sharedService: SharedService) { }

    ngOnInit() {
        this.roomCode = this._sharedService.getData('dashboard_room').value;
        this.getRoom();
    }

    getRoom() {
        this._roomService.get(this.roomCode).subscribe(
            (response) => this.room = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
