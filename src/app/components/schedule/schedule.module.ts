import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SelectRoomModule } from '../room/select-room/select-room.module';
import { ToastyModule } from 'ng2-toasty';
import { RoomService } from '../../shared/services/room.service';
import { ReservationService } from '../../shared/services/reservation.service';
import { SharedService } from '../../shared/services/shared.service';
import { CustomErrorHandler } from '../../shared/error-handler';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SelectRoomModule,
        ToastyModule.forRoot()
    ],
    declarations: [ScheduleComponent],
    providers: [
        ReservationService,
        SharedService,

        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        ScheduleComponent
    ]
})
export class ScheduleModule { }
