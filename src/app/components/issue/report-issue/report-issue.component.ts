import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { IssueService } from '../../../shared/services/issue.service';

import Issue from '../../../shared/models/issue.model';
import Room from '../../../shared/models/room.model';

import * as moment from 'moment';

@Component({
    selector: 'app-report-issue',
    templateUrl: './report-issue.component.html',
    styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit {
    issue: Issue = new Issue();
    room: string;

    constructor(private _issueService: IssueService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.room = params['room'];
            }
        );
    }

    submitForm() {
        this.issue.resolved = false;
        this.issue.created_on = new Date();
        this.issue.room_code = this.room;

        this._issueService.create(this.issue).subscribe(
            (response) => { this.router.navigate(['/readings']); },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
