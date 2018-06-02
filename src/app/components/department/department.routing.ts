import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';

import { DepartmentComponent } from './department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';

const routes: Routes = [
    {
        path: 'departments',
        children: [
            { path: '', component: DepartmentComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddDepartmentComponent, canActivate: [AuthGuard] },
            { path: 'edit/:department', component: EditDepartmentComponent, canActivate: [AuthGuard] }
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
export class DepartmentRoutingModule { }
