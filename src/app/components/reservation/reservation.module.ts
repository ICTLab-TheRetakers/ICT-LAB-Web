import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { ReservationRoutingModule } from './reservation.routing';

import { ReservationComponent } from './reservation.component';
import { ReservationService } from '../../shared/services/reservation.service';
import { CustomErrorHandler } from '../../shared/error-handler';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        ReservationRoutingModule
    ],
    declarations: [ReservationComponent],
    providers: [
        ReservationService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class ReservationModule { }
