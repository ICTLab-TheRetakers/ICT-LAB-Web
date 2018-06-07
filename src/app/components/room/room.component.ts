import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http/src/response';

import { SelectRoomComponent } from './select-room/select-room.component';

import { RoomService } from '../../shared/services/room.service';
import { ReservationService } from '../../shared/services/reservation.service';
import { ScheduleHelper } from '../../shared/schedule.helper';

import Room from '../../shared/models/room.model';
import Schedule from '../../shared/models/schedule/schedule.model';
import Lesson from '../../shared/models/schedule/lesson.model';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    rooms: Room[];

    constructor(private _roomService: RoomService) { }

    ngOnInit() {
        this.getRooms();
    }

    getRooms() {
        this._roomService.getAllRooms().subscribe(
            (response) => this.rooms = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    deleteRoom(room: string) {
        if (confirm('Are you sure you want to delete this room?')) {
            this._roomService.delete(room).subscribe(
                (response) => this.ngOnInit(),
                (error: HttpErrorResponse) => { throw error; }
            );
        }
    }

}
