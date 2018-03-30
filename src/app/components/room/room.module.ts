import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RoomRoutingModule } from './room.routing';

import { RoomComponent } from './room.component';
import { RoomService } from '../../shared/services/room.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RoomRoutingModule
    ],
    declarations: [RoomComponent],
    providers: [
        RoomService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class RoomModule { }
