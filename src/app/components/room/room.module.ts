import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastyModule } from 'ng2-toasty';

import { RoomRoutingModule } from './room.routing';

import { RoomComponent } from './room.component';
import { SelectRoomModule } from './select-room/select-room.module';

import { SharedService } from '../../shared/services/shared.service';
import { RoomService } from '../../shared/services/room.service';
import { CustomErrorHandler } from '../../shared/error-handler';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SelectRoomModule,
        ToastyModule.forRoot(),
        RoomRoutingModule,
    ],
    declarations: [
        RoomComponent
    ],
    providers: [
        RoomService,
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class RoomModule { }
