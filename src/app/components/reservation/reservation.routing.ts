import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';
import { AuthGuard } from '../../shared/authguard.service';
import { AddReservationComponent } from './add/add-reservation.component';

const routes: Routes = [
    {
        path: 'reservations',
        children: [
            { path: '', component: ReservationComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddReservationComponent, canActivate: [AuthGuard] }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class ReservationRoutingModule { }
