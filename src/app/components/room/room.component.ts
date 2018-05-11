import { Component, OnInit } from '@angular/core';

import Room from '../../shared/models/room.model';

import { RoomService } from '../../shared/services/room.service';
import { SharedService } from '../../shared/services/shared.service';

import { SelectRoomComponent } from './select-room/select-room.component';
import { ReservationService } from '../../shared/services/reservation.service';
import Schedule from '../../shared/models/schedule/schedule.model';
import { Observable } from 'rxjs/Observable';
import Lesson from '../../shared/models/schedule/lesson.model';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    selectedRoom: Room = null;
    schedule: Schedule = null;
    department: string;
    scheduleType: string;
    options: string[];
    hours: string[] = ['8:30-9:20', '9:20-10:10', '10:30-11:20', '11:20-12:10', '12:10-13:00', '13:00-13:50', '13:50-14:40', '15:00-15:50',
        '15:50-16:40', '17:00-17:50', '17:50-18:40', '18:40-19:30', '19:30-20:20', '20:20-21:10', '21:10-22:00'];

    constructor(private _roomService: RoomService, private _reservationService: ReservationService) { }

    ngOnInit() {}

    getRoomChoice(event: any) {
        this.selectedRoom = event;
    }

    getSchedule(event: any) {
        let identifier = '';
        let index = event.target.value.toString();

        switch (index.length) {
            case 1:
                identifier = this.scheduleType + '0000' + index;
                break;
            case 2:
                identifier = this.scheduleType + '000' + index;
                break;
            case 3:
                identifier = this.scheduleType + '00' + index;
                break;
            case 4:
                identifier = this.scheduleType + '0' + index;
                break;
            default:
                identifier = this.scheduleType + '000' + index;
                break;
        }

        this._reservationService.getLessonsByWeek(this.scheduleType, identifier, this.department, 4, 20).subscribe(
            (response) => this.schedule = response,
            (error) => {
                return Observable.throw(error)
            }
        );
    }

    getLesson(day: string, hour: string): Lesson {
        return this.schedule.days.filter(f => f.weekday == day)[0].lessons.filter(f => f.start_time == hour)[0];
    }

    setScheduleType(event: any) {
        this.scheduleType = event.target.value;
        if (this.scheduleType == "r") {
            this._reservationService.getAllRooms(this.department, 4).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        } else if (this.scheduleType == "c") {
            this._reservationService.getAllClasses(this.department, 4).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        } else {
            this._reservationService.getAllTeachers(this.department, 4).subscribe(
                (response) => this.options = response,
                (error) => {
                    return Observable.throw(error)
                }
            );
        }
    }
}
