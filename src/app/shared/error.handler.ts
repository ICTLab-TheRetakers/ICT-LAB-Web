import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
export class ErrorsHandler extends ErrorHandler {

    constructor(private injector: Injector) { super(); }

    handleError(error: any): void {

        let toasty = this.injector.get(ToastyService);
        let toastOptions = {
            title: "Oops, an error occured",
            msg: "An error occured during",
            showClose: true,
            timeout: 5000,
            theme: 'bootstrap'
        };

        toasty.error(toastOptions);
    }

}
