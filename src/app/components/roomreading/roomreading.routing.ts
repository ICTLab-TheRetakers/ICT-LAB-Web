import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomReadingComponent } from './roomreading.component';

const routes: Routes = [
    {
        path: 'readings',
        children: [
            { path: '', component: RoomReadingComponent, pathMatch: 'full' }
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
export class RoomReadingRoutingModule { }
