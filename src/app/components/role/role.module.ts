import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoleComponent } from './role.component';
import { RoleService } from '../../shared/services/role.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [RoleComponent],
  providers: [
    RoleService
  ],
})
export class RoleModule { }
