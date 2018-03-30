import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs/Rx';

import { ToastyService, ToastyConfig, ToastyComponent, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private toastyService: ToastyService) { super(); }

    handleError(error: any) {
        let message = '';
        let subscription: Subscription;
        const date = new Date().toISOString();

        //Set message based on error
        if (error instanceof HttpErrorResponse) {
            message = 'An error occured while your request was being processed, please try again!';
            console.error(date, 'HTTP Error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
        } else if (error instanceof TypeError) {
            message = 'An error occured, please try again!';
            console.error(date, 'Typescript Error', error.message);
        } else if (error instanceof Error) {
            message = 'An error occured, please try again!';
            console.error(date, 'General Error', error.message);
        } else {
            message = 'Something unexpected happened, please try again!';
            console.error(date, 'Unexpected Error', error.message);
        }

        //Create toast
        var toastOptions: ToastOptions = {
            title: "Oops, an error occured",
            msg: message,
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap',
            onAdd: (toast: ToastData) => {
                let observable = Observable.interval(1000).take(5);
                                // Start listen seconds beat
                                    subscription = observable.subscribe((count: number) => {
                                            //// Update title of toast
                                                //toast.title = this.getTitle(seconds - count - 1);
                                                //// Update message of toast
                                                //toast.msg = this.getMessage(seconds - count - 1);
                                            });
            },
            onRemove: function (toast: ToastData) {}
        };

        //Show toast
        this.toastyService.error(toastOptions);
    }
}
