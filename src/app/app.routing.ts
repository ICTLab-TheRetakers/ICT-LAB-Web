import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { DeviceComponent } from './components/device/device.component';
import { RoomComponent } from './components/room/room.component';
import { RoomReadingComponent } from './components/roomreading/roomreading.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { IssueComponent } from './components/issue/issue.component';
import { NotificationComponent } from './components/notification/notification.component';
import { AuthGuard } from './shared/authguard.service';
import { SignInComponent } from './components/user/sign-in/sign-in.component';

const routes: Routes = [
    {
        path: '',
        component: RoomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'rooms',
        component: RoomComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'reservations',
        component: ReservationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'devices',
        component: DeviceComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'issues',
        component: IssueComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'readings',
        component: RoomReadingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notifications',
        component: NotificationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: SignInComponent
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
