import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {ScheduleModule} from '../schedule/schedule.module';
import {RoomreadingsModule} from '../roomreading/roomreading.module';


@NgModule({
  imports: [
      CommonModule,
      ScheduleModule,
      RoomreadingsModule
  ],
    declarations: [DashboardComponent],
    exports: [DashboardComponent]
})
export class DashboardModule { }
