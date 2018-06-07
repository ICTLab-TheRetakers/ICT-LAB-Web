import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { NotificationService } from '../../shared/services/notification.service'
import User from '../../shared/models/user.model';
import Notification from '../../shared/models/notification.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    alerts: Notification[] = [];
    user: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
    toastOptions: ToastOptions;

    constructor(private _readingService: NotificationService,
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

    ngOnInit() {
        this.getLatestAlerts();
    }

    getLatestAlerts() {
        this._readingService.getByUser(this.user['user_id']).subscribe(
            (response) => {
                if (response != null && response.length > 0) {
                    this.alerts = response;
                    this.sortByLatest();
                } else {
                    this.alerts.push(new Notification(1, this.user['user_id'], new Date().toDateString(), "There are no recent alerts"));
                }
            },
            (error) => {
                console.log(error);
                this.toastOptions.msg = 'Unable to retrieve alerts. Please try again!',
                    this.toastyService.error(this.toastOptions);
            }
        );
    }

    sortByLatest() {
        this.alerts = this.alerts.sort(function (a, b) {
            return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
        });
    }
}
