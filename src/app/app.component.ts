import { Component, OnInit } from '@angular/core';

import Room from './shared/models/room.model';
import { RoomService } from './shared/services/room.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor() { }
    ngOnInit() {}
}
