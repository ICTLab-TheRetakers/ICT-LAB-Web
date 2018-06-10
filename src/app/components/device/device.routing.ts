import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent } from './device.component';
import { AuthGuard } from '../../shared/authguard.service';
import {AddDeviceComponent} from './add-device/add-device.component';

const routes: Routes = [
    {
        path: 'devices',
        children: [
            { path: 'add/:room', component: AddDeviceComponent, canActivate: [AuthGuard] }
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
export class DeviceRoutingModule { }
