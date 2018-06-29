import { Component, OnInit } from '@angular/core';
import { ScheduleHelper } from '../../shared/schedule.helper';
import Schedule from '../../shared/models/schedule/schedule.model';
import { environment } from '../../../environments/environment';
import { RoomService } from '../../shared/services/room.service';
import { ReservationService } from '../../shared/services/reservation.service';
import {SharedService} from "../../shared/services/shared.service";

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
    hours: string[] = environment.hours;
    _scheduleHelper: ScheduleHelper;
    schedule: Schedule = null;

    constructor() { }

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

        return this._scheduleHelper.print(lesson);
    }

    resetSchedule(event: any) {
        if (event == true) {
            this.schedule = null;
        }
    }
}
