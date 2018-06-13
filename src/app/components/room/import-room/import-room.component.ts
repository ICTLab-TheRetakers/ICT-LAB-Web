import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomService } from '../../../shared/services/room.service';
import { Router } from '@angular/router';
import { ToastyService, ToastOptions } from 'ng2-toasty';

import Room from '../../../shared/models/room.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-import-room',
    templateUrl: './import-room.component.html',
    styleUrls: ['./import-room.component.css']
})
export class ImportRoomComponent implements OnInit {
    rooms: Room[] = [];
    toastOptions: ToastOptions;

    @ViewChild('fileInput') fileInput;

    constructor(private _roomService: RoomService, private router: Router, private toastyService: ToastyService) {
        this.toastOptions = {
            title: '',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000,
            onRemove: () => {
                this.router.navigate(['/rooms']);
            }
        };
    }

    ngOnInit() {
    }

    importCSV() {
        this.fileUpload();
    }

    saveRooms() {
        this.rooms.forEach(room => {
            this._roomService.create(room).subscribe(
                (response) => {
                    this.toastOptions.title = 'Success';
                    this.toastOptions.msg = 'Room(s) have successfully been imported!';
                    this.toastyService.success(this.toastOptions);
                },
                (error: HttpErrorResponse) => { }
            );
        });
    }

    mapData(data: any[]) {
        for (var i = 0; i < data.length; i++) {
            let room = new Room();
            room.room_code = data[0];
            room.student_capacity = Number.parseInt(data[1]);
            room.has_computer = Boolean(data[2]);
            room.has_smartboard = Boolean(data[3]);
            room.has_windows = Boolean(data[4]);

            this.rooms.push(room);
        }
    }

    fileUpload(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];

            if (fileToUpload) {
                let reader: FileReader = new FileReader();
                reader.readAsText(fileToUpload);

                reader.onload = (e) => {
                    let csv: string = reader.result;
                    let allTextLines = csv.split(/\r|\n|\r/);
                    let headers = allTextLines[0].split(',');

                    console.log(JSON.stringify(allTextLines));
                    if (allTextLines.length <= 1) {
                        this.toastOptions.title = 'Error';
                        this.toastOptions.msg = 'CSV file has no content!';
                        this.toastyService.error(this.toastOptions);
                    }

                    for (let i = 1; i < allTextLines.length; i++) {
                        // split content based on comma
                        let data = allTextLines[i].split(',');
                        if (data.length === headers.length) {
                            let tarr = [];
                            for (let j = 0; j < headers.length; j++) {
                                tarr.push(data[j]);
                            }

                            this.mapData(tarr);
                        }
                    }

                    this.saveRooms();
                }
            }
        } else {
            this.toastOptions.title = 'Error';
            this.toastOptions.msg = 'Unable to read file!';
            this.toastyService.error(this.toastOptions);
        }
    }
}
