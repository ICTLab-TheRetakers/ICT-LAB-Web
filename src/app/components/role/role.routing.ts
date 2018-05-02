import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleComponent } from './role.component';
import { AuthGuard } from '../../shared/authguard.service';

const routes: Routes = [
    {
        path: 'roles',
        children: [
            { path: '', component: RoleComponent, canActivate: [AuthGuard] }
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
export class RoleRoutingModule { }
