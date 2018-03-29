import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationComponent } from './reservation.component';

const routes: Routes = [
    {
        path: 'reservations',
        children: [
            { path: '', component: ReservationComponent, pathMatch: 'full' }
        ]
    },
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
export class ReservationRoutingModule { }
