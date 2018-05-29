import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Observable } from 'rxjs/Observable';

import { IssueService } from '../../shared/services/issue.service';

import Issue from '../../shared/models/issue.model';

@Component({
    selector: 'app-issue',
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {
    issues: Issue[];

    constructor(private _issueService: IssueService) { }

    ngOnInit() {
        this.getIssues();
    }

    getIssues() {
        this._issueService.getAll().subscribe(
            (response) => this.issues = response,
            (error) => { return Observable.throw(error); }
        );
    }

}
