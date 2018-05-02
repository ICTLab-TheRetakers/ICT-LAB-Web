import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotificationComponent } from './notification.component';
import { AuthGuard } from '../../shared/authguard.service';

const routes: Routes = [
    {
        path: 'notifications',
        children: [
            { path: '', component: NotificationComponent, canActivate: [AuthGuard] }
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
export class NotificationRoutingModule { }
