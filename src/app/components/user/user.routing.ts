import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';

import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ImportUserComponent } from './import-user/import-user.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            { path: '', component: UserComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'add', component: AddUserComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'edit/:user', component: EditUserComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
            { path: 'details/:user', component: DetailsUserComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
            { path: 'import', component: ImportUserComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'reset-password', component: ResetPasswordComponent }
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
