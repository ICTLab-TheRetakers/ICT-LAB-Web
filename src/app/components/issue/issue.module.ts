import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { IssueRoutingModule } from './issue.routing';

import { IssueComponent } from './issue.component';
import { IssueService } from '../../shared/services/issue.service';
import { CustomErrorHandler } from '../../shared/error-handler';
import { ReportIssueComponent } from './report-issue/report-issue.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        IssueRoutingModule
    ],
    declarations: [IssueComponent, ReportIssueComponent],
    providers: [
        IssueService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class IssueModule { }
