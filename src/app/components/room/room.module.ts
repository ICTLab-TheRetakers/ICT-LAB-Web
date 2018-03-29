import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
;
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
        RoomService
    ],
})
export class RoomModule { }
