import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/authguard.service';

import { IssueComponent } from './issue.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { EditIssueComponent } from './edit-issue/edit-issue.component';

const routes: Routes = [
    {
        path: 'issues',
        children: [
            { path: '', component: IssueComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'report/:room', component: ReportIssueComponent, canActivate: [AuthGuard], data: { roles: [1, 2, 3] } },
            { path: 'edit/:id', component: EditIssueComponent, canActivate: [AuthGuard], data: { roles: [1] } } 
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
