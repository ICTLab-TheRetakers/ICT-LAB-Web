import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';

import { ReservationComponent } from './reservation.component';
import { AddReservationComponent } from './add/add-reservation.component';
import { EditReservationComponent } from './edit/edit-reservation.component';

const routes: Routes = [
    {
        path: 'reservations',
        children: [
            { path: '', component: ReservationComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
            { path: 'add', component: AddReservationComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
            { path: 'edit/:id', component: EditReservationComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } }
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
