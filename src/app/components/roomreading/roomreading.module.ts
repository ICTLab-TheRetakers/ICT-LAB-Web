import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoomreadingsComponent } from './roomreading.component';
import { RoomReadingService } from '../../shared/services/reading.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [RoomreadingsComponent],
  providers: [
      RoomReadingService
  ],
})
export class RoomreadingsModule { }
