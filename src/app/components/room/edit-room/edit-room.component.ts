import { Component, OnInit } from '@angular/core';
import Room from '../../../shared/models/room.model';
import { RoomService } from '../../../shared/services/room.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
    room: Room;
    roomCode: string;

    constructor(private _roomService: RoomService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.roomCode = params['room'];
                this.getRoom();
            }
        );
    }

    getRoom() {
        this._roomService.get(this.roomCode).subscribe(
            (response) => this.room = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    submitForm() {
        this._roomService.update(this.room).subscribe(
            (response) => this.router.navigate(['/rooms']),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
