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
    currentReadings: ReadingViewModel;
    toastOptions: ToastOptions;

    temperature: number;
    sound: number;
    light: number;
    humidity: number;
    created_on: Date;

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
            this.temperature = this.readings.filter(f => f.type == 'temp')[0] != null ? this.readings.filter(f => f.type == 'temp')[0].value : -1;
            this.humidity = this.readings.filter(f => f.type == 'humidity')[0] != null ? this.readings.filter(f => f.type == 'humidity')[0].value : -1;
            this.sound = this.readings.filter(f => f.type == 'sound')[0] != null ? this.readings.filter(f => f.type == 'sound')[0].value : -1;
            this.light = this.readings.filter(f => f.type == 'light')[0].value || -1;

            var type = '';
            if (this.temperature != null) {
                type = 'temp';
            }
            else if (this.humidity != null) {
                type = 'humidity';
            }
            else if (this.sound != null) {
                type = 'sound';
            }
            else if (this.light != null) {
                type = 'light';
            }
            this.created_on = this.readings.filter(f => f.type == type) != null ? new Date(this.readings.filter(f => f.type == type)[0].created_on) : null;
        }
    }

    getRoomChoice(event: any) {
        this.selectedRoom = event;
        this.getLatestReadings();
    }
}
