import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ToastOptions, ToastyService, ToastyConfig } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';

import { RoomService } from '../../../shared/services/room.service';
import { ReservationService } from '../../../shared/services/reservation.service';
import { Observable } from 'rxjs/Observable';

import Room from '../../../shared/models/room.model';
import Schedule from '../../../shared/models/schedule/schedule.model';

import * as moment from 'moment';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
    selector: 'app-select-room',
    templateUrl: './select-room.component.html',
    styleUrls: ['./select-room.component.css']
})
export class SelectRoomComponent implements OnInit {
    schedule: Schedule = null;
    startWeek: number = null;
    currentWeek: number = null;
    quarter: string = null;
    type: string = null;
    index: number = null;
    options: string[] = null;
    hide: boolean = false;
    room: Room;

    @Input() onlyAllowRooms: boolean;
    @Input() getSchedule: boolean;
    @Output() chosenObject = new EventEmitter<any>();
    @Output() resetSchedule = new EventEmitter<boolean>();

    constructor(private _roomService: RoomService, private _reservationService: ReservationService,
                private _sharedService: SharedService) { }

    ngOnInit() {
        this.setCurrentWeekAndQuarter();
        this.checkIfRoomAvailable();
        this.setRoomOptions();
    }

    checkIfRoomAvailable() {
        let room = this._sharedService.getData('room');
        if (room != null) {
            this.room = room.value;
            this.getScheduleByRoom();
        }
    }

    getScheduleByRoom() {
        this.type = 'r';
        this.getOptions();

        this.index = this.options.indexOf(this.room.room_code);
        this.selectOption(null, true);
    }

    setRoomOptions() {
        if (this.onlyAllowRooms == true) {
            this.type = 'r';
            this.hide = true;

            this._roomService.getAllRooms().subscribe(
                (response) => this.options = response.map(m => m.room_code),
				(error: HttpErrorResponse) => { throw error; }
            );
        }
    }

    setCurrentWeekAndQuarter() {
        let today = new Date();
        let dayOfWeek = moment(today).day();
        let time = moment(today).hours();
        let week = moment(today).isoWeek();
        let quarter = moment(today).quarter();

        switch (quarter) {
            case 1:
                this.quarter = '3';
                break;
            case 2:
                this.quarter = '4';
                break;
            case 3:
                this.quarter = '1';
                break;
            case 4:
                this.quarter = '2';
                break;
        }

        this.startWeek = moment(today).week();
        if (dayOfWeek == 0 || dayOfWeek == 6 || (dayOfWeek == 5 && time >= 22)) {
            this.startWeek = this.startWeek + 1;
            week++;
        }

        if (week > 27 && week < 36) {
            this.quarter = 'Zomerrooster';
        }

        this.currentWeek = this.startWeek;
    }

    setType(event: any) {
        this.options = [];
        this.type = event.target.value;

        this.getOptions();
    }

    async selectOption(event: any, getSchedule: boolean) {
        let identifier = '';

        if (this.index == null) {
            this.index = event.target.value;
        }

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
                (error: HttpErrorResponse) => { throw error; }
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

            this._reservationService.getLessonsByWeek(this.type, identifier, this.quarter, this.currentWeek).subscribe(
                (response) => {
                    this.schedule = response;
                    this.chosenObject.emit(this.schedule);
                },
                (error: HttpErrorResponse) => { throw error; }
            );
        }
    }

    getOptions() {
        if (this.currentWeek != null && this.quarter != null && this.type != null) {
            if (this.type == "r") {
                this._reservationService.getAllRooms(this.quarter).subscribe(
                    (response) => this.options = response,
                    (error: HttpErrorResponse) => { throw error; }
                );
            } else if (this.type == "c") {
                this._reservationService.getAllClasses(this.quarter).subscribe(
                    (response) => this.options = response,
                    (error: HttpErrorResponse) => { throw error; }
                );
            } else if (this.type == "t") {
                this._reservationService.getAllTeachers(this.quarter).subscribe(
                    (response) => this.options = response,
                    (error: HttpErrorResponse) => { throw error; }
                );
            }
        }
    }

    previousWeek() {
        this.currentWeek = this.currentWeek - 1;

        // Save variables
        let index = this.index;
        let type = this.type;

        this.reset();

        // Set variables back
        this.index = index;
        this.type = type;

        this.selectOption(null, true);
        this.resetSchedule.emit(true);
    }

    nextWeek() {
        this.currentWeek = this.currentWeek + 1;

        // Save variables
        let index = this.index;
        let type = this.type;

        this.reset();

        // Set variables back
        this.index = index;
        this.type = type;

        this.selectOption(null, true);
        this.resetSchedule.emit(true);
    }

    reset() {
        this.schedule = null;

        if (this.hide == false) {
            this.type = null;
        }
    }
}
