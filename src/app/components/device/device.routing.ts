import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent } from './device.component';

const routes: Routes = [
    {
        path: 'devices',
        children: [
            { path: '', component: DeviceComponent, pathMatch: 'full' }
        ]
    },
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
