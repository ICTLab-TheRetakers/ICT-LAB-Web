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

    schedule: Schedule = null;
    startWeek: number = null;
    quarter: string = null;
    index: number = null;
    options: string[] = null;
    reservation: Reservation[];

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

        //CHANGED: Noteerd de datum van maandag en vrijdag voor de huidige week zodat deze datums gebruikt kunnen worden om in de DB te zoeken naar bepaalde reservations van een week
        today.setHours(0, 0, 0, 0);
        let monday = moment(today).isoWeekday(1).format("YYYY-MM-DDTHH:mm:ss");
        let friday = moment(today).isoWeekday(6).format("YYYY-MM-DDTHH:mm:ss");
        this.setReservationsForWeek(monday, friday);

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

        //TODO: Verrander waar this.quarter value krijgt. Gaat daar namelijk nu iets fout en hij krijgt telkens 4 als value en niet Zomerrooster.
        //CHAGNED this._reservationService.getLessonsByWeek('r', identifier, this.quarter, this.startWeek).subscribe(
        this._reservationService.getLessonsByWeek('r', identifier, 'Zomerrooster', this.startWeek).subscribe(
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

    //CHANGED: Vult de reservation array met alle reservations van een bepaalde week
    setReservationsForWeek(from: string, till: string) {
        this._reservationService.getByRoomAndDate(this.roomCode, from, till).subscribe(
            (response) => {
                this.reservation = response;
            },
            (error: HttpErrorResponse) => {
                throw error;
            });
    }

    //CHANGED: Code om reservaties op te halen
    getReservation(day: string, hour: string): string {
        var dayNumber = 0;
        var reservedStatus = '';
        var reservedBy = '';
        var print = '';

        //Er is geen .toDayString of iets dergelijks dus moeten we van de dag een number maken
        if (day == 'Monday') {
            dayNumber = 1;
        } else if (day == 'Tuesday') {
            dayNumber = 2;
        } else if (day == 'Wednesday') {
            dayNumber = 3;
        } else if (day == 'Thursday') {
            dayNumber = 4;
        } else if (day == 'Friday') {
            dayNumber = 5;
        }
        
        //Filtered de reservation array om alleen de reservations van een bepaalde dag te laten zien
        var filteredReservation = this.reservation.filter(f => new Date(f.start_time).getDay() == dayNumber);
        for (var i = 0; i < filteredReservation.length; i++) {

            //Maakt van 8:30-9:20 -> 08:30-09:20 en van 9:20-10:10 -> 09:20-10:10 met .concat wat 2 strings samenvoegd
            if (hour.length == 9) {
                hour = '0'.concat(hour.substring(0, 4)).concat('0').concat(hour.substring(5));
            } if (hour.length == 10) {
                hour = '0'.concat(hour);
            }

            //Haalt de uren en minuten op uit de database en voegt deze samen. Moet apart in uren en minuten omdat getTime() niet goed reageerd op toString()
            var startHour = new Date(filteredReservation[i].start_time).getHours().toString();
            if (startHour.length < 2) {
                startHour = '0'.concat(startHour);
            }
            var startMinutes = new Date(filteredReservation[i].start_time).getMinutes().toString();
            if (startMinutes.length < 2) {
                startMinutes = '0'.concat(startMinutes);
            }
            var endHour = new Date(filteredReservation[i].end_time).getHours().toString();
            if (endHour.length < 2) {
                endHour = '0'.concat(endHour);
            }
            var endMinutes = new Date(filteredReservation[i].end_time).getMinutes().toString();
            if (endMinutes.length < 2) {
                endMinutes = '0'.concat(endMinutes);
            }
            var startTime = startHour + ':' + startMinutes;
            var endTime = endHour + ':' + endMinutes;

            //Check of de reservering tussen een bepaald tijdslot valt
            if (hour.substring(0, 5) <= startTime && hour.substring(6) > startTime) {
                reservedStatus = 'GERESERVEERD';
                reservedBy = filteredReservation[i].user_id;
            } if (hour.substring(0, 5) >= startTime && hour.substring(6) <= endTime) {
                reservedStatus = 'GERESERVEERD';
                reservedBy = filteredReservation[i].user_id;
            } if (hour.substring(0, 5) < endTime && hour.substring(6) >= endTime) {
                reservedStatus = 'GERESERVEERD';
                reservedBy = filteredReservation[i].user_id;
            }
        }
        if (reservedStatus != '') {
            print = '<b>' + reservedStatus + '</b><br />' + reservedBy +'';
        }
        return print;
    }

    //CHANGED: Haalt eerst het rooster van HRO op als deze leeg is wordt er naar reservering gekeken
    getTimeslot(day: string, hour: string): string {
        var print = this.getLesson(day, hour);
        if (print == '') {
            print = this.getReservation(day, hour);
        }
        return print;
    }

    initHelper() {
        this._scheduleHelper = new ScheduleHelper(this.schedule);
    }
}
