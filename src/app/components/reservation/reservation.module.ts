import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReservationRoutingModule } from './reservation.routing';

import { ReservationComponent } from './reservation.component';
import { ReservationService } from '../../shared/services/reservation.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReservationRoutingModule
    ],
    declarations: [ReservationComponent],
    providers: [
        ReservationService
    ],
})
export class ReservationModule { }
