import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { ReservationRoutingModule } from './reservation.routing';

import { ReservationComponent } from './reservation.component';
import { ReservationService } from '../../shared/services/reservation.service';
import { CustomErrorHandler } from '../../shared/error-handler';
import { AddReservationComponent } from './add/add-reservation.component';

import { SelectRoomModule } from '../room/select-room/select-room.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SelectRoomModule,
        ToastyModule.forRoot(),
        ReservationRoutingModule
    ],
    declarations: [ReservationComponent, AddReservationComponent],
    providers: [
        ReservationService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class ReservationModule { }
