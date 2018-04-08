import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomService } from '../../shared/services/room.service';

import Roomreading from '../../shared/models/reading.model';
import Room from '../../shared/models/room.model';
import ReadingViewModel from '../../shared/models/reading.viewmodel';

import { SelectRoomComponent } from '../room/select-room/select-room.component';

@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    readings: Roomreading[] = [];
    selectedRoom: Room = null;
    currentReadings: ReadingViewModel = null;
    toastOptions: ToastOptions;

    constructor(private _readingService: RoomReadingService, private _roomService: RoomService,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

        //Set toast theme
        this.toastyConfig.theme = 'bootstrap';
        this.toastOptions = {
            title: 'Oops, an error occured',
            msg: '',
            timeout: 5000,
            showClose: true,
            theme: 'bootstrap'
        };
    }

    ngOnInit() {}

    getLatestReadings() {
        this._readingService.getByRoom(this.selectedRoom.room_code).subscribe(
            res => {
                if (res != null || res.length > 0) {
                    this.readings = res;
                    this.sortByLatest();
                }
            },
            (err) => {
                this.toastOptions.msg = 'Unable to retrieve classroom information. Please try again!',
                this.toastyService.error(this.toastOptions);
            }
        );
    }

    sortByLatest() {
        this.readings = this.readings.sort(function (a, b) {
            return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
        });
        this.setReadingsData();
    }

    getLastHour() {
        var hour = 60 * 60 * 1000
        var pastHour = Date.now() - hour;
        this.readings = this.readings.filter(f => new Date(f.created_on).getTime() >= pastHour);
    }

    setReadingsData() {
        if (this.readings.length > 0) {
            this.currentReadings = new ReadingViewModel();
            this.currentReadings.temperature = this.readings.filter(f => f.type == 'temp')[0].value ? this.readings.filter(f => f.type == 'temp')[0].value : null;
            this.currentReadings.humidity = this.readings.filter(f => f.type == 'humidity')[0].value ? this.readings.filter(f => f.type == 'humidity')[0].value : null;
            this.currentReadings.sound = this.readings.filter(f => f.type == 'sound')[0].value ? this.readings.filter(f => f.type == 'sound')[0].value : null;
            this.currentReadings.light = this.readings.filter(f => f.type == 'light')[0].value ? this.readings.filter(f => f.type == 'light')[0].value : null;
            this.currentReadings.created_on = new Date(this.readings.filter(f => f.type == 'temp')[0].created_on) ? new Date(this.readings.filter(f => f.type == 'temp')[0].created_on) : null;
        }
        console.log('current' + this.currentReadings);
    }

    getRoomChoice(event: any) {
        this.selectedRoom = event;
        this.getLatestReadings();
    }
}
