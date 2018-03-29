import { NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DeviceRoutingModule } from './device.routing';

import { DeviceComponent } from './device.component';
import { DeviceService } from '../../shared/services/device.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        DeviceRoutingModule
    ],
    declarations: [DeviceComponent],
    providers: [
        DeviceService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ],
})
export class DeviceModule { }
