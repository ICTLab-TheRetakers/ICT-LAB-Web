import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../shared/services/room.service';
import Room from '../../shared/models/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

    location: string = 'Wijnhaven 107';
    rooms: Room[] = [];

    constructor(private _roomService: RoomService) { }

    ngOnInit() {
        this.findRooms();
    }

    findRooms(): void {
        this._roomService.getByLocation(this.location).subscribe(
            values => this.rooms = values.map(r => new Room(r.room_code, r.has_smartboard, r.has_computer, r.has_windows, r.student_capacity, r.location)),
            (err) => console.log(err)
        );
    }

}
