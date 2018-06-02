import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../shared/services/department.service';
import Department from '../../shared/models/department.model';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
    departments: Department[];

    constructor(private _departmentService: DepartmentService) { }

    ngOnInit() {
        this.getDepartments();
    }

    getDepartments() {
        this._departmentService.getAll().subscribe(
            (response) => this.departments = response,
            (error) => { return Observable.throw(error); }
        );
    }

    deleteDepartment(department: string) {
        if (confirm('Are you sure you want to delete this department?')) {
            this._departmentService.delete(department).subscribe(
                (response) => this.ngOnInit(),
                (error) => { return Observable.throw(error); }
            );
        }
    }

}
