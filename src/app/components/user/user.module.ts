import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserService } from '../../shared/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [UserComponent],
  providers: [
    UserService
  ],
})
export class UserModule { }
