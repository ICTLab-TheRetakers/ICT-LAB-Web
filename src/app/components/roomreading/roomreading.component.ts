import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { RoomReadingService } from '../../shared/services/reading.service';
import { SharedService } from '../../shared/services/shared.service';
import Roomreading from '../../shared/models/reading.model';

@Component({
    selector: 'app-roomreadings',
    templateUrl: './roomreading.component.html',
    styleUrls: ['./roomreading.component.css']
})
export class RoomReadingComponent implements OnInit {
    readings: Roomreading[] = [];
    currentRoom: string;
    toastOptions: ToastOptions;

    constructor(private _readingService: RoomReadingService, private _sharedService: SharedService,
        private toastyService: ToastyService, private toastyConfig: ToastyConfig) {

        //Set toast theme
        this.toastyConfig.theme = 'bootstrap';
        this.toastOptions = {
            title: 'Oops, an error occured',
            msg: 'Unable to retrieve readings. Please try again!',
            timeout: 5000,
            showClose: true,
            theme: 'bootstrap'
        };
    }

    ngOnInit() {
        this.receiveSelectedRoom();
        this.getLatestReadings();
    }

    receiveSelectedRoom() {
        this.currentRoom = this._sharedService.data;
    }

    getLatestReadings() {
        this._readingService.getByRoom(this.currentRoom).subscribe(
            res => {
                this.readings = res; this.sortByLatest();
            },
            (err) => {
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
}
