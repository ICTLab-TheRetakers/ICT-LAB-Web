import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { DeviceComponent } from './components/device/device.component';
import { RoomComponent } from './components/room/room.component';
import { RoomReadingComponent } from './components/roomreading/roomreading.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { IssueComponent } from './components/issue/issue.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent
    },
    {
        path: 'users',
        component: UserComponent,
    },
    {
        path: 'rooms',
        component: RoomComponent,
    },
    {
        path: 'devices',
        component: DeviceComponent,
    },
    {
        path: 'issues',
        component: IssueComponent,
    },
    {
        path: 'readings',
        component: RoomReadingComponent,
    },
    {
        path: 'notifications',
        component: NotificationComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
