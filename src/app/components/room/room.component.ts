import { Component, OnInit } from '@angular/core';
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

    constructor(private _roomService: RoomService) { }

    ngOnInit() {
        this.getAllRooms();
    }

    findRoomsByLocation(): void {
        this.rooms.filter(f => f.location.includes(this.location));
    }

    getAllRooms() {
        this._roomService.getAllRooms().subscribe(
            values => this.rooms = values,
            (err) => console.log(err)
        );
    }

}
