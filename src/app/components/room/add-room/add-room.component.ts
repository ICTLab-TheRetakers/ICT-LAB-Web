import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../../shared/services/room.service';
import { DepartmentService } from '../../../shared/services/department.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import Room from '../../../shared/models/room.model';
import Department from '../../../shared/models/department.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
    room: Room = new Room();
    departments: Department[];

    constructor(private _roomService: RoomService, private _departmentService: DepartmentService, private router: Router) { }

    ngOnInit() {
        this.getDepartments();
    }

    getDepartments() {
        this._departmentService.getAll().subscribe(
            (response) => this.departments = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    submitForm() {
        this._roomService.create(this.room).subscribe(
            (response) => this.router.navigate(['/rooms']),
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
