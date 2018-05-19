import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Room from '../../../shared/models/room.model';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';

import { RoomService } from '../../../shared/services/room.service';
import Schedule from '../../../shared/models/schedule/schedule.model';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-select-room',
    templateUrl: './select-room.component.html',
    styleUrls: ['./select-room.component.css']
})
export class SelectRoomComponent implements OnInit {
    schedule: Schedule = null;
    department: string = null;
    week: number = null;
    quarter: number = null;
    type: string = null;
    index: number = null;
    options: string[] = null;

    @Input() onlyAllowRooms = new EventEmitter<boolean>();
    @Input() getSchedule = new EventEmitter<boolean>();
    @Output() chosenObject = new EventEmitter<any>();

    constructor(private _roomService: RoomService, private _reservationService: ReservationService) { }

    ngOnInit() {
        this.onlyAllowRooms.subscribe(
            (response) => {
                if (response == true) {
                    this.type == 'r';
                }
            }
        );
    }

    setDepartment(event: any) {
        this.department = event.target.value;
        this.reset();
    }

    setType(event: any) {
        this.options = [];
        this.type = event.target.value;

        if (this.type == "r") {
            this._reservationService.getAllRooms(this.department, this.quarter).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        } else if (this.type == "c") {
            this._reservationService.getAllClasses(this.department, this.quarter).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        } else {
            this._reservationService.getAllTeachers(this.department, this.quarter).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        }
    }

    selectOption(event: any, getSchedule: boolean) {
        let identifier = '';
        this.index = event.target.value;

        // Perform reset
        this.schedule = null;
        this.chosenObject.emit(null);

        if (getSchedule == false) {
            // Emit room
            var roomCode = this.options[(this.index - 1)];
            var room = this._roomService.get(roomCode).subscribe(
                (response) => {
                    this.chosenObject.emit(response);
                },
                (error) => {
                    return Observable.throw(error)
                }
            );

        } else {
            // Emit schedule
            switch (this.index.toString().length) {
                case 1:
                    identifier = this.type + '0000' + this.index.toString();
                    break;
                case 2:
                    identifier = this.type + '000' + this.index.toString();
                    break;
                case 3:
                    identifier = this.type + '00' + this.index.toString();
                    break;
                case 4:
                    identifier = this.type + '0' + this.index.toString();
                    break;
                default:
                    identifier = this.type + '000' + this.index.toString();
                    break;
            }

            this._reservationService.getLessonsByWeek(this.type, identifier, this.department, this.quarter, this.week).subscribe(
                (response) => {
                    this.schedule = response;
                    this.chosenObject.emit(this.schedule);
                },
                (error) => {
                    return Observable.throw(error)
                }
            );
        }
    }

    reset() {
        this.schedule = null;
        this.type = null;
        this.week = null;
        this.quarter = null;
        this.index = null;
        this.options = null;
    }
}
