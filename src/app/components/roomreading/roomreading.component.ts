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
import User from  '../../shared/models/user.model';
import Role from  '../../shared/models/role.model';
import {UserService} from '../../shared/services/user.service';
import {RoleService} from  '../../shared/services/role.service';


@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    toastOptions: ToastOptions;
    limit: number = 20;
    userId: string;
    roles: Role[];
    roomCode: string;
    readings: Roomreading[] = [];
    device: Device = null;
    selectedRoom: Room = null;
    currentUser: User;
    user: User;
    temperature: number;
    sound: number;
    light: number;
    humidity: number;
    created_on: Date;
    hasDevice: boolean;

    constructor(private _userService: UserService, private _roleService: RoleService, private _readingService: RoomReadingService, private _deviceService: DeviceService, private _sharedService: SharedService,
        private route: ActivatedRoute, private router: Router) {

        }

    ngOnInit() {
        this.checkIfRoomAvailable();
        this.getCurrentUser();

    }

    getUser(email: string) {
        this._userService.getById(email).subscribe(
            (response) => {
                this.user = response;
                this.getRoles();
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getRoles() {
        this._roleService.getAll().subscribe(
            (response) => this.roles = response,
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    getCurrentUser() {
        this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
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
        }, 750);
    }

    getDeviceByRoom() {
        this._deviceService.getByRoom(this.selectedRoom.room_code).subscribe(
            (response) => {
                this.device = response[0];

                this.readings = [];
                this.getLatestReadings();

                if (response.length === 0) {

                    this.hasDevice = false;

                } else {
                    this.hasDevice = true;
                }



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

    onAddDevice() {
        const newDevice = {'room_code': this.selectedRoom.room_code};
        if ( !this.hasDevice) {
            return this._deviceService.create({room_code: this.selectedRoom.room_code})
                .subscribe((res => {
                    this.device = res;
                }));
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
