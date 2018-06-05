import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../shared/services/room.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

import Room from '../../../shared/models/room.model';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
    room: Room = new Room();

    constructor(private _roomService: RoomService, private router: Router) { }

    ngOnInit() {}

    submitForm() {
        this._roomService.create(this.room).subscribe(
            (response) => this.router.navigate(['/rooms']),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
