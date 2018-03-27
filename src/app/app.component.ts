import { Component, OnInit } from '@angular/core';

import Room from './shared/models/room.model';
import { RoomService } from './shared/services/room.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    location: string = 'Wijnhaven 107';
    rooms: Room[] = [];

    constructor(private _roomService: RoomService) { }

    ngOnInit() {
        this._roomService.getByLocation(this.location).subscribe(
            values => this.rooms = values,
            (err) => console.log(err)
        );
    }
}
