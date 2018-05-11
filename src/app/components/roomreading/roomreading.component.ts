import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomService } from '../../shared/services/room.service';

import Roomreading from '../../shared/models/reading.model';
import Room from '../../shared/models/room.model';
import ReadingViewModel from '../../shared/models/viewmodels/reading.viewmodel';

import { SelectRoomComponent } from '../room/select-room/select-room.component';

@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    readings: Roomreading[] = [];
    selectedRoom: Room = null;
    toastOptions: ToastOptions;
    limit: number = 20;

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
        this._readingService.getByRoomLimit(this.selectedRoom.room_code, this.limit).subscribe(
            (response) => {
                if (response != null || response.length > 0) {
                    this.readings = response;
                    this.sortByLatest();
                }
            },
            (error) => {
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
            this.light = this.readings.filter(f => f.type == 'light')[0] != null ? this.readings.filter(f => f.type == 'light')[0].value: -1;

            var type = '';
            if (this.temperature != -1) {
                type = 'temp';
            }
            else if (this.humidity != -1) {
                type = 'humidity';
            }
            else if (this.sound != -1) {
                type = 'sound';
            }
            else if (this.light != -1) {
                type = 'light';
            }
            this.created_on = this.readings.filter(f => f.type == type)[0] != null ? new Date(this.readings.filter(f => f.type == type)[0].created_on) : null;
        }
    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;
        this.getLatestReadings();
    }
}
