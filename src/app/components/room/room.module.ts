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
import { ReservationService } from '../../shared/services/reservation.service';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { ImportRoomComponent } from './import-room/import-room.component';

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
        RoomComponent,
        AddRoomComponent,
        EditRoomComponent,
        ImportRoomComponent
    ],
    providers: [
        RoomService,
        ReservationService,
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class RoomModule { }
