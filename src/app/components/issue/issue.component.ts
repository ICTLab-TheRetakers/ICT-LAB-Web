import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';

import { IssueService } from '../../shared/services/issue.service';

import Issue from '../../shared/models/issue.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationResult } from '../../shared/models/pagination.result';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    issues: Issue[];
    pagedResult: PaginationResult<Issue>;

    constructor(private _issueService: IssueService) { }

    ngOnInit() {
        this.getPage(1);
    }

    getPage(page: number) {
        this._issueService.index(page).subscribe(
            (response) => {
                this.pagedResult = response;
                this.issues = this.pagedResult.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    resolveIssue(id: number) {
        let issue = this.issues.filter(f => f.issue_id == id)[0];
        issue.resolved = true;

        this._issueService.update(issue).subscribe(
            (response) => this.ngOnInit(),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
