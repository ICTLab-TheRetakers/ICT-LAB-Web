import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { DeviceRoutingModule } from './device.routing';

import { DeviceComponent } from './device.component';
import { DeviceService } from '../../shared/services/device.service';
import { CustomErrorHandler } from '../../shared/error-handler';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        DeviceRoutingModule
    ],
    declarations: [DeviceComponent],
    providers: [
        DeviceService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class DeviceModule { }
