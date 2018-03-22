import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoomComponent } from './room.component';
import { RoomService } from '../../shared/services/room.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [RoomComponent],
  providers: [
    RoomService
  ],
})
export class RoomModule { }
