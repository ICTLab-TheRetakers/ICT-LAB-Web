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
    weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    roomCode: string;

    schedule: Schedule = null;
    startWeek: number = null;
    quarter: string = null;
    index: number = null;
    options: string[] = null;
    reservations: Reservation[];

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

        // get the dates of monday and friday of the current week
        today.setHours(0, 0, 0, 0);
        let firstDayOfWeek = moment(today).isoWeekday(1).format("YYYY-MM-DDTHH:mm:ss");
        let lastDayOfWeek = moment(today).isoWeekday(6).format("YYYY-MM-DDTHH:mm:ss");

        this.setReservations(firstDayOfWeek, lastDayOfWeek);

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

    SelectLessonOrReservation(day: number, hour: string): string {
        var result = this.getLesson(day, hour);
        if (result == '') {
            result = this.getReservation(day, hour);
        }

        return result;
    }

    getLesson(day: number, hour: string): string {
        let lesson = this.schedule.days.filter(f => f.weekday == this.weekdays[day - 1])[0].lessons.filter(f => f.start_time == hour)[0];

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

    getReservation(day: number, hour: string): string {
        var result = '';
        var reservation = new Reservation();

        if (this.reservations == null)
            return result;

        // get the reservations of the day
        var reservations = this.reservations.filter(f => new Date(f.start_time).getDay() == day);

        for (var i = 0; i < reservations.length; i++) {
            // get the beginning and ending hours of the reservation
            var start = new Date(reservations[i].start_time).toTimeString().substring(0, 5);
            var end = new Date(reservations[i].end_time).toTimeString().substring(0, 5);

            // Make sure every hour string is the same length for comparison
            if (hour.length != 11)
                hour = hour.length == 9 ? '0'.concat(hour.substring(0, 4)).concat('0').concat(hour.substring(5)) : '0'.concat(hour);

            // check if the hour begins or ends with the reservation time
            if (hour.startsWith(start)) {
                reservation = reservations[i];
                break;
            } else if (hour.endsWith(end)) {
                reservation = reservations[i];
                break;
            }

            // Do a direct string comparison in case the reservation is over many hours
            if (hour.substring(0, 5) > start && hour.substring(6) < end) {
                reservation = reservations[i];
            }
        }

        if (reservation.description != null) {
            if (reservation.description.length > 25)
                result = '<b><u>Reservation</u></b><br />' + reservation.description.substring(0, 24) + '...<br /><i>' + reservation.user_id + '</i>';
            else
                result = '<b><u>Reservation</u></b><br />' + reservation.description + '<br /><i>' + reservation.user_id + '</i>';
        }
            

        return result;

    }

    initHelper() {
        this._scheduleHelper = new ScheduleHelper(this.schedule);
    }
}
