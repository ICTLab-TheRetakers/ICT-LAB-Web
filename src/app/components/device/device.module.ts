import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { DeviceComponent } from './device.component';
import { DeviceService } from '../../shared/services/device.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [DeviceComponent],
  providers: [
    DeviceService
  ],
})
export class DeviceModule { }
