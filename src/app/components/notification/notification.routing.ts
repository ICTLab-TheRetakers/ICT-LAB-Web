import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationComponent } from './notification.component';

const routes: Routes = [
    {
        path: 'notifications',
        children: [
            { path: '', component: NotificationComponent, pathMatch: 'full' }
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
export class NotificationRoutingModule { }
