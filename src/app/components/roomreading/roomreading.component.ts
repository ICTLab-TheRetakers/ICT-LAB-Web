import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { RoomReadingService } from '../../shared/services/reading.service';
import { SharedService } from '../../shared/services/shared.service';
import { RoomService } from '../../shared/services/room.service';
import Roomreading from '../../shared/models/reading.model';
import Room from '../../shared/models/room.model';
import ReadingViewModel from '../../shared/models/reading.viewmodel';

@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    readings: Roomreading[] = [];
    rooms: Room[] = [];
    selectedRoom: Room = null;
    currentReadings: ReadingViewModel;
    toastOptions: ToastOptions;

    constructor(private _readingService: RoomReadingService, private _roomService: RoomService,
        private _sharedService: SharedService, private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {

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

    ngOnInit() {
        this.getAllRooms();
    }

    getLatestReadings() {
        this._readingService.getByRoom(this.selectedRoom.room_code).subscribe(
            res => {
                this.readings = res;
                this.sortByLatest();
                //this.getLastHour();
                this.setReadingsData();
            },
            (err) => {
                this.toastOptions.msg = 'Unable to retrieve classroom readings. Please try again!',
                this.toastyService.error(this.toastOptions);
            }
        );
    }

    sortByLatest() {
        this.readings = this.readings.sort(function (a, b) {
            return new Date(b.created_on).getTime() - new Date(a.created_on).getTime()
        });
    }

    getLastHour() {
        var hour = 60 * 60 * 1000
        var pastHour = Date.now() - hour;
        this.readings = this.readings.filter(f => new Date(f.created_on).getTime() >= pastHour);

    }

    setReadingsData() {
        this.currentReadings = new ReadingViewModel();
        this.currentReadings.temperature = this.readings.filter(f => f.type == 'temp')[0].value;
        this.currentReadings.humidity = this.readings.filter(f => f.type == 'humidity')[0].value;
        this.currentReadings.sound = this.readings.filter(f => f.type == 'sound')[0].value;
        this.currentReadings.light = this.readings.filter(f => f.type == 'light')[0].value;
    }

    getAllRooms() {
        this._roomService.getAllRooms().subscribe(
            values => {
                this.rooms = values;
            },
            (err) => {
                this.toastOptions.msg = 'Unable to retrieve classrooms. Please try again!',
                this.toastyService.error(this.toastOptions);
            }
        );
    }

    setRoom($event) {
        this.selectedRoom = this.rooms.filter(f => f.room_code == $event.target.value)[0];
        this.getLatestReadings();
    }
}
