import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

import { SelectRoomComponent } from './select-room/select-room.component';

import { RoomService } from '../../shared/services/room.service';
import { ReservationService } from '../../shared/services/reservation.service';
import { ScheduleHelper } from '../../shared/schedule.helper';

import Room from '../../shared/models/room.model';
import Schedule from '../../shared/models/schedule/schedule.model';
import Lesson from '../../shared/models/schedule/lesson.model';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    hours: string[] = environment.hours;
    _scheduleHelper: ScheduleHelper;
    schedule: Schedule = null;

    constructor(private _roomService: RoomService, private _reservationService: ReservationService) { }

    ngOnInit() { }

    initHelper() {
        this._scheduleHelper = new ScheduleHelper(this.schedule);
    }

    getScheduleChoice(event: any) {
        this.schedule = event;
        this.initHelper();
    }

    getLesson(day: string, hour: string): string {
        let lesson = this.schedule.days.filter(f => f.weekday == day)[0].lessons.filter(f => f.start_time == hour)[0];
        setTimeout(() => { }, 1000);

        return this._scheduleHelper.print(lesson);
    }

    resetSchedule(event: any) {
        if (event == true) {
            this.schedule = null;
        }
    }
}
