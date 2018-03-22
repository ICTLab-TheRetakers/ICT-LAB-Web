import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { IssueComponent } from './issue.component';
import { IssueService } from '../../shared/services/issue.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [IssueComponent],
  providers: [
    IssueService
  ],
})
export class IssueModule { }
