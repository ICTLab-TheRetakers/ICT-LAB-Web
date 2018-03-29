import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleComponent } from './role.component';

const routes: Routes = [
    {
        path: 'roles',
        children: [
            { path: '', component: RoleComponent, pathMatch: 'full' }
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
