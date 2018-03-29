import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomReadingComponent } from './roomreading.component';

const routes: Routes = [
    {
        path: 'readings',
        children: [
            { path: '', component: RoomReadingComponent }
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
export class RoomReadingRoutingModule { }
