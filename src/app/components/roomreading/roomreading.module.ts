import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { RoomReadingRoutingModule } from './roomreading.routing';

import { RoomReadingComponent } from './roomreading.component';

import { SharedService } from '../../shared/services/shared.service';
import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomService } from '../../shared/services/room.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        RoomReadingRoutingModule
    ],
    declarations: [RoomReadingComponent],
    providers: [
        RoomReadingService,
        RoomService,
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy } 
    ]
})
export class RoomreadingsModule { }
