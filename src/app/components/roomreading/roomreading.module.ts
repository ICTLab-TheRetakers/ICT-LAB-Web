import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoomReadingRoutingModule } from './roomreading.routing';

import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomReadingComponent } from './roomreading.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RoomReadingRoutingModule
    ],
    declarations: [RoomReadingComponent],
    providers: [
        RoomReadingService
    ],
})
export class RoomreadingsModule { }
