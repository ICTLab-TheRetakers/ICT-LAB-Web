import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { IssueService } from '../../../shared/services/issue.service';

import Issue from '../../../shared/models/issue.model';
import Room from '../../../shared/models/room.model';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-edit-issue',
    templateUrl: './edit-issue.component.html',
    styleUrls: ['./edit-issue.component.css']
})
export class EditIssueComponent implements OnInit {
    issue: Issue;
    //issues: Issue[];
    issue_id: number;
  

    constructor(private _issueService: IssueService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.issue_id = +params['id'];
                console.log('issueid', this.issue_id);
                this.getIssue();
            }
        );
    }

    getIssue() {
        this._issueService.get(this.issue_id).subscribe(
            (response) => this.issue = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    unResolveIssue(id: number) {
       // let issue = this.issues.filter(f => f.issue_id == id)[0];
        this.issue.resolved = false;

        this._issueService.update(this.issue).subscribe(
            (response) => this.ngOnInit(),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    submitForm() {
        this._issueService.update(this.issue).subscribe(
            (response) => this.router.navigate(['/issues']),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    
}
