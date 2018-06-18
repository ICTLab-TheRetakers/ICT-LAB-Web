import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomReadingComponent } from './roomreading.component';
import { AuthGuard } from '../../shared/authguard.service';
import {AddDeviceComponent} from '../device/add-device/add-device.component';

const routes: Routes = [
    {
        path: 'readings',
        children: [
            { path: '', component: RoomReadingComponent }
        ]
    },
    {
        path: 'devices',
        children: [
            { path: 'add', component: AddDeviceComponent, canActivate: [AuthGuard] }
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
export class RoomReadingRoutingModule { }
