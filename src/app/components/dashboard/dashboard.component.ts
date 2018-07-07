import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ScheduleComponent} from '../schedule/schedule.component';
import {ScheduleModule} from  '../schedule/schedule.module';
import Schedule from '../../shared/models/schedule/schedule.model';
import {ScheduleHelper} from '../../shared/schedule.helper';
import {environment} from '../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import * as moment from 'moment';
import {ReservationService} from '../../shared/services/reservation.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    _scheduleHelper: ScheduleHelper;
    hours: string[] = environment.hours;
    roomCode: string;

    schedule: Schedule = null;
    startWeek: number = null;
    quarter: string = null;
    index: number = null;
    options: string[] = null;

    constructor(private route: ActivatedRoute, private _reservationService: ReservationService, private _sharedService: SharedService) {
        this.route.params.subscribe(
            (params) => {
                this.roomCode = params['room'];
                this.roomCode = this.roomCode.split('-').join('.');

                this._sharedService.setData('dashboard-room', this.roomCode);
            }
        );
    }

    ngOnInit() {
        this.getScheduleByRoom();
    }

    getScheduleByRoom() {
        this.setCurrentWeekAndQuarter();
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
        if (dayOfWeek == 6 || (dayOfWeek == 5 && time >= 22)) {
            this.startWeek = this.startWeek + 1;
        }

        if (quarter == 3 && week <= 27) {
            this.quarter = '4';
        }

        if (week > 27 && week < 36) {
            this.quarter = 'Zomerrooster';
        }

        this.getOptions();
    }

    selectOption() {
        let identifier = '';

        // Perform reset
        this.schedule = null;
        // Emit schedule
        this.index++;
        switch (this.index.toString().length) {
            case 1:
                identifier = 'r0000' + this.index.toString();
                break;
            case 2:
                identifier = 'r000' + this.index.toString();
                break;
            case 3:
                identifier = 'r00' + this.index.toString();
                break;
            case 4:
                identifier = 'r0' + this.index.toString();
                break;
            default:
                identifier = 'r000' + this.index.toString();
                break;
        }

        this._reservationService.getLessonsByWeek('r', identifier, this.quarter, this.startWeek).subscribe(
            (response) => {
                this.schedule = response;
                this.initHelper();
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getOptions() {
        this._reservationService.getAllRooms(this.quarter).subscribe(
        (response) =>  {
            this.index = response.indexOf(this.roomCode);
                this.selectOption();
            },
        (error: HttpErrorResponse) => {
                throw error;
            }
        );

    }

    getLesson(day: string, hour: string): string {
        let lesson = this.schedule.days.filter(f => f.weekday == day)[0].lessons.filter(f => f.start_time == hour)[0];

        return this._scheduleHelper.print(lesson);
    }

    initHelper() {
        this._scheduleHelper = new ScheduleHelper(this.schedule);
    }
}
