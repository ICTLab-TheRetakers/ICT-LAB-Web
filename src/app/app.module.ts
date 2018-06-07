import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ToastyModule } from 'ng2-toasty';

import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { RoomModule } from './components/room/room.module';
import { UserModule } from './components/user/user.module';
import { RoomreadingsModule } from './components/roomreading/roomreading.module';
import { DeviceModule } from './components/device/device.module';
import { NotificationModule } from './components/notification/notification.module';
import { IssueModule } from './components/issue/issue.module';
import { ReservationModule } from './components/reservation/reservation.module';
import { RoleModule } from './components/role/role.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ScheduleModule } from './components/schedule/schedule.module';

import { SharedService } from './shared/services/shared.service';
import { AuthGuard } from './shared/authguard.service';
import { AuthenticationService } from './shared/authentication.service';
import { CustomErrorHandler } from './shared/error-handler';

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
        DashboardModule,
        ScheduleModule,
        ToastyModule.forRoot(),
        QRCodeModule,
        AppRoutingModule //Keep at bottom
    ],
    providers: [
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: AuthGuard, useClass: AuthGuard },
        { provide: AuthenticationService, useClass: AuthenticationService },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
