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
import Reservation from '../../shared/models/reservation.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    _scheduleHelper: ScheduleHelper;
    hours: string[] = environment.hours;
    roomCode: string;

    reservations: Reservation[];
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

        today.setHours(0, 0, 0, 0);

        let dayOne = moment(today).isoWeekday(1).format("YYYY-MM-DDTHH:mm:ss");
        let dayTwo = moment(today).isoWeekday(6).format("YYYY-MM-DDTHH:mm:ss");


        this.setReservations(dayOne, dayTwo);

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

    setReservations(from: string, till: string) {
        this._reservationService.getByRoomAndDate(this.roomCode, from, till).subscribe(
            (response) => {
                this.reservations = response;
            },
            (error: HttpErrorResponse) => {
                throw error;
            });
    }

    getReservations(day: string, hour: string): string {
        var isReserved = false;
        var reserverName = '';
        var print = '';
        var dayNum = 0;

        if (day == 'Monday') {
            dayNum = 1;
        } if (day == 'Tuesday') {
            dayNum = 2;
        } if (day == 'Wednesday') {
            dayNum = 3;
        } if (day == 'Thursday') {
            dayNum = 4;
        } if (day == 'Friday') {
            dayNum = 5;
        }

        var dailyReservation = this.reservations.filter(f => new Date(f.start_time).getDay() == dayNum);
        for (var i = 0; i < dailyReservation.length; i++) {

            //adds extra 0 where needed ( 8:30-9:20 => 08:30-09:20)
            if (hour.length != 11)
                hour = hour.length == 9 ? '0'.concat(hour.substring(0, 4)).concat('0').concat(hour.substring(5)) : '0'.concat(hour);

            var startTime = new Date(dailyReservation[i].start_time).toTimeString().substring(0, 5);
            var endTime = new Date(dailyReservation[i].end_time).toTimeString().substring(0, 5);

            //checks if reservation is in a specific timeslot
            if (hour.substring(0, 5) <= startTime && hour.substring(6) > startTime) {
                isReserved = true;
                reserverName = dailyReservation[i].user_id;
            } if (hour.substring(0, 5) >= startTime && hour.substring(6) <= endTime) {
                isReserved = true;
                reserverName = dailyReservation[i].user_id;
            } if (hour.substring(0, 5) < endTime && hour.substring(6) >= endTime) {
                isReserved = true;
                reserverName = dailyReservation[i].user_id;
            }
        }
        if (isReserved == true) {
                print = '<b> Reserved by ' + reserverName + '';
        }

        return print;

    }

    //if time is selected timeslot on hro is empty, look at reservations
    getTimeslot(day: string, hour: string): string {
        var print = this.getLesson(day, hour);
        if (print == '') {
            print = this.getReservations(day, hour);
        }
        return print;
    }

    initHelper() {
        this._scheduleHelper = new ScheduleHelper(this.schedule);
    }
}
