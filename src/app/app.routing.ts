import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/authguard.service';

import { UserComponent } from './components/user/user.component';
import { DeviceComponent } from './components/device/device.component';
import { RoomComponent } from './components/room/room.component';
import { RoomReadingComponent } from './components/roomreading/roomreading.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { IssueComponent } from './components/issue/issue.component';
import { NotificationComponent } from './components/notification/notification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
    {
        path: '',
        component: ScheduleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'users',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
    },
    {
        path: 'rooms',
        component: RoomComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
    },
    {
        path: 'reservations',
        component: ReservationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'devices',
        component: DeviceComponent,
        canActivate: [AuthGuard],
        data: { roles: [1] }
    },
    {
        path: 'issues',
        component: IssueComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'readings',
        component: RoomReadingComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard/:id',
        component: DashboardComponent,
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
    },
    {
        path: 'users/reset-password',
        component: ResetPasswordComponent
    },
    {
        path: '**',
        component: NotFoundComponent
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
