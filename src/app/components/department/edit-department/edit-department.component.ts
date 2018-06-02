import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../shared/services/department.service';
import { Router, ActivatedRoute } from '@angular/router';

import Department from '../../../shared/models/department.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-edit-department',
    templateUrl: './edit-department.component.html',
    styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
    department: Department;
    department_code: string;

    constructor(private _departmentService: DepartmentService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params) => {
                this.department_code = params['department'];
                this.getDepartment();
            }
        );
    }

    submitForm() {
        this._departmentService.update(this.department).subscribe(
            (response) => this.router.navigate(['/departments']),
            (error) => { return Observable.throw(error); }
        );
    }

    getDepartment() {
        this._departmentService.get(this.department_code).subscribe(
            (response) => this.department = response,
            (error) => { return Observable.throw(error); }
        );
    }
}
