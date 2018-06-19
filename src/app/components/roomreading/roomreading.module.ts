import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { RoomReadingRoutingModule } from './roomreading.routing';

import { RoomReadingComponent } from './roomreading.component';
import { DeviceRoutingModule } from '../device/device.routing';
import { SharedService } from '../../shared/services/shared.service';
import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomService } from '../../shared/services/room.service';

import { SelectRoomModule } from '../room/select-room/select-room.module';
import { CustomErrorHandler } from '../../shared/error-handler';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        SelectRoomModule,
        DeviceRoutingModule,
        ToastyModule.forRoot(),
        RoomReadingRoutingModule
    ],
    declarations: [
        RoomReadingComponent,
        SidebarComponent,
    ],
    exports: [
        SidebarComponent
    ],
    providers: [
        RoomReadingService,
        RoomService,
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class RoomreadingsModule { }
