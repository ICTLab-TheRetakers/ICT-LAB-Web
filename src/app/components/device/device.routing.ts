import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent } from './device.component';
import { AuthGuard } from '../../shared/authguard.service';

const routes: Routes = [
    {
        path: 'devices',
        children: [
            { path: '', component: DeviceComponent, canActivate: [AuthGuard] }
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
