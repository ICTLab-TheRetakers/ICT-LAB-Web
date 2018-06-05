import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../shared/services/department.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import Department from '../../../shared/models/department.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-add-department',
    templateUrl: './add-department.component.html',
    styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
    department: Department = new Department();

    constructor(private _departmentService: DepartmentService, private router: Router) { }

    ngOnInit() {
    }

    submitForm() {
        this._departmentService.create(this.department).subscribe(
            (response) => this.router.navigate(['/departments']),
            (error: HttpErrorResponse) => { throw error; }
        );
    }
}
