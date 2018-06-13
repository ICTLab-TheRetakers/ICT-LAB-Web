import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastOptions, ToastyService } from 'ng2-toasty';

import User from '../../../shared/models/user.model';

@Component({
    selector: 'app-import-user',
    templateUrl: './import-user.component.html',
    styleUrls: ['./import-user.component.css']
})
export class ImportUserComponent implements OnInit {
    users: User[] = [];
    toastOptions: ToastOptions;

    @ViewChild('fileInput') fileInput;

    constructor(private _userService: UserService, private router: Router, private toastyService: ToastyService) {
        this.toastOptions = {
            title: '',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000,
            onRemove: () => {
                this.router.navigate(['/users']);
            }
        };
    }

    ngOnInit() {
    }

    importCSV() {
        this.fileUpload();
    }

    saveUsers() {
        this.users.forEach(user => {
            this._userService.create(user).subscribe(
                (response) => {
                    this.toastOptions.title = 'Success';
                    this.toastOptions.msg = 'User(s) have successfully been imported!';
                    this.toastyService.success(this.toastOptions);
                },
                (error: HttpErrorResponse) => {  }
            );
        });
    }

    mapData(data: any[]) {
        for (var i = 0; i < data.length; i++) {
            let user = new User();
            user.user_id = data[0];
            user.first_name = data[1];
            user.last_name = data[2];
            user.email = data[3];
            user.role_id = Number.parseInt(data[4]);
            user.password = user.last_name + user.first_name + user.role_id;

            this.users.push(user);
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
                    if (allTextLines.length  <= 1) {
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

                    this.saveUsers();
                }
            }
        } else {
            this.toastOptions.title = 'Error';
            this.toastOptions.msg = 'Unable to read file!';
            this.toastyService.error(this.toastOptions);
        }
    }
}
