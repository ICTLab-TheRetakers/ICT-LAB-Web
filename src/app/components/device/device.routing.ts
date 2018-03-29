import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceComponent } from './device.component';

const routes: Routes = [
    {
        path: 'devices',
        children: [
            { path: '', component: DeviceComponent }
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
export class DeviceRoutingModule { }
