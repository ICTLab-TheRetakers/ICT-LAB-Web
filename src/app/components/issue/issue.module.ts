import { NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IssueRoutingModule } from './issue.routing';

import { IssueComponent } from './issue.component';
import { IssueService } from '../../shared/services/issue.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        IssueRoutingModule
    ],
    declarations: [IssueComponent],
    providers: [
        IssueService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ]
})
export class IssueModule { }
