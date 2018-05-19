import { Component, OnInit } from '@angular/core';

import Room from '../../shared/models/room.model';

import { RoomService } from '../../shared/services/room.service';
import { SharedService } from '../../shared/services/shared.service';

import { SelectRoomComponent } from './select-room/select-room.component';
import { ReservationService } from '../../shared/services/reservation.service';
import Schedule from '../../shared/models/schedule/schedule.model';
import { Observable } from 'rxjs/Observable';
import Lesson from '../../shared/models/schedule/lesson.model';
import { ScheduleHelper } from '../../shared/schedule.helper';

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
    hours: string[] = ['8:30-9:20', '9:20-10:10', '10:30-11:20', '11:20-12:10', '12:10-13:00', '13:00-13:50', '13:50-14:40', '15:00-15:50',
        '15:50-16:40', '17:00-17:50', '17:50-18:40', '18:40-19:30', '19:30-20:20', '20:20-21:10', '21:10-22:00'];
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
        setTimeout(() => {}, 1000);

        return this._scheduleHelper.print(lesson);
    }

    resetSchedule(event: any) {
        if (event == true) {
            this.schedule = null;
        }
    }
}
