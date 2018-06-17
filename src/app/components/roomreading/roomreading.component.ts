import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { RoomReadingService } from '../../shared/services/reading.service';
import { RoomService } from '../../shared/services/room.service';

import Roomreading from '../../shared/models/reading.model';
import Room from '../../shared/models/room.model';
import ReadingViewModel from '../../shared/models/viewmodels/reading.viewmodel';
import Device from '../../shared/models/device.model';

import { SelectRoomComponent } from '../room/select-room/select-room.component';
import { SharedService } from '../../shared/services/shared.service';
import { DeviceService } from '../../shared/services/device.service';


@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    toastOptions: ToastOptions;
    limit: number = 20;

    roomCode: string;
    readings: Roomreading[] = [];

    device: Device = null;
    selectedRoom: Room = null;

    temperature: number;
    sound: number;
    light: number;
    humidity: number;
    created_on: Date;

    constructor(private _readingService: RoomReadingService, private _deviceService: DeviceService, private _sharedService: SharedService,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.checkIfRoomAvailable();
    }

    checkIfRoomAvailable() {
        if (this._sharedService.getData('room') != null) {
            this.selectedRoom = this._sharedService.getData('room').value;
            this.getDeviceByRoom();
        }
    }

    getRoomChoice(event: any) {
        this.selectedRoom = <Room>event;

        setTimeout(() => {
            this.getDeviceByRoom();
        }, 500);
    }

    getDeviceByRoom() {
        this._deviceService.getByRoom(this.selectedRoom.room_code).subscribe(
            (response) => {
                this.device = response[0];

                this.readings = [];
                this.getLatestReadings();
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getLatestReadings() {
        if (this.device != null) {
            this._readingService.getByDeviceLimit(this.device.device_id, this.limit).subscribe(
                (response) => {
                    if (response != null || response.length > 0) {
                        this.readings = response;
                        this.sortByLatest();
                    }
                },
                (error: HttpErrorResponse) => { }
            );
        }
    }

    sortByLatest() {
        this.readings = this.readings.sort(function (a, b) {
            return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
        });
        this.setReadingsData();
    }

    setReadingsData() {
        if (this.readings.length > 0) {
            this.temperature = this.readings.filter(f => f.type == 'temp')[0] != null ? this.readings.filter(f => f.type == 'temp')[0].value : -1;
            this.humidity = this.readings.filter(f => f.type == 'humidity')[0] != null ? this.readings.filter(f => f.type == 'humidity')[0].value : -1;
            this.sound = this.readings.filter(f => f.type == 'sound')[0] != null ? this.readings.filter(f => f.type == 'sound')[0].value : -1;
            this.light = this.readings.filter(f => f.type == 'light')[0] != null ? this.readings.filter(f => f.type == 'light')[0].value : -1;

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
}
