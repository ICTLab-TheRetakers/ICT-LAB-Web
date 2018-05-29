import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/authguard.service';

import { IssueComponent } from './issue.component';
import { ReportIssueComponent } from './report-issue/report-issue.component';

const routes: Routes = [
    {
        path: 'issues',
        children: [
            { path: '', component: IssueComponent, canActivate: [AuthGuard] },
            { path: 'report/:room', component: ReportIssueComponent, canActivate: [AuthGuard] }
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
