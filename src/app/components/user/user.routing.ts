import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';

import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            { path: '', component: UserComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddUserComponent, canActivate: [AuthGuard] }
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
export class UserRoutingModule { }
