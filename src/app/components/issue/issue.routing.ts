import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssueComponent } from './issue.component';
import { AuthGuard } from '../../shared/authguard.service';

const routes: Routes = [
    {
        path: 'issues',
        children: [
            { path: '', component: IssueComponent, canActivate: [AuthGuard] }
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
export class IssueRoutingModule { }
