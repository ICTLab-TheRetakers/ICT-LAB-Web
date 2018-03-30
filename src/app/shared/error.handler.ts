import { ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

export class GlobalErrorHandler extends ErrorHandler {

    constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        super();

        // Assign the toasty theme
        this.toastyConfig.theme = 'bootstrap';
    }

    handleError(error: any) {
        let message = '';
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
            theme: 'bootstrap'
        };

        //Show toast
        this.toastyService.error(toastOptions);
    }
}
