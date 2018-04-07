import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastyModule } from 'ng2-toasty';

import { SelectRoomComponent } from './select-room.component';

import { RoomService } from '../../../shared/services/room.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot()
    ],
    exports: [
        SelectRoomComponent
    ],
    declarations: [
        SelectRoomComponent
    ],
    providers: [
        RoomService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class SelectRoomModule { }
