import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IssueComponent } from './issue.component';

const routes: Routes = [
    {
        path: 'issues',
        children: [
            { path: '', component: IssueComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class IssueRoutingModule { }
