import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DeviceService} from "../../../shared/services/device.service";
import {HttpErrorResponse} from "@angular/common/http";
import Room from "../../../shared/models/room.model";
import Device from "../../../shared/models/device.model";

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

    device: Device = null;
    selectedRoom: Room = null;
    deviceid: number;
    room: string;
    hasDevice: boolean;

  constructor(private route: ActivatedRoute, private _deviceService: DeviceService) {
      this.room = this.route.snapshot.paramMap.get('room');
      this._deviceService.getByRoom(this.room).subscribe(
          (response) => {

              this.deviceid = response[0].device_id;
          },
          (error: HttpErrorResponse) => { throw error; }
      );
  }

  ngOnInit() {

  }

    getDeviceByRoom() {
        this._deviceService.getByRoom(this.selectedRoom.room_code).subscribe(
            (response) => {
                this.device = response[0];
                //console.log('has device: ', response[0])

                if (!response[0]) {

                    this.hasDevice = false;
                    console.log('has device: ', this.hasDevice);
                }


            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

}
