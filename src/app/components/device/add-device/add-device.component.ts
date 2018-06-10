import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

    room: string;

  constructor(private route: ActivatedRoute) {

    /*  this.route.queryParams.subscribe(params => {
          this.room = params['room'];
      });*/
  }

  ngOnInit() {
      this.room = this.route.snapshot.paramMap.get('room');
  }

}
