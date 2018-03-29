import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoomService } from './shared/services/room.service';

import { AppRoutingModule } from './app.routing';
import { RoomModule } from './components/room/room.module';
import { UserModule } from './components/user/user.module';
import { RoomreadingsModule } from './components/roomreading/roomreading.module';
import { DeviceModule } from './components/device/device.module';
import { NotificationModule } from './components/notification/notification.module';
import { IssueModule } from './components/issue/issue.module';
import { ReservationModule } from './components/reservation/reservation.module';
import { RoleModule } from './components/role/role.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RoomModule,
        UserModule,
        RoomreadingsModule,
        DeviceModule,
        NotificationModule,
        IssueModule,
        ReservationModule,
        RoleModule,
        AppRoutingModule
    ],
    providers: [
        RoomService,
        { provide: LocationStrategy, useClass: PathLocationStrategy } 
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
