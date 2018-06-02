import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../../shared/error-handler';

import { DepartmentRoutingModule } from './department.routing';

import { DepartmentComponent } from './department.component';

import { SharedService } from '../../shared/services/shared.service';
import { DepartmentService } from '../../shared/services/department.service';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        DepartmentRoutingModule,
    ],
    declarations: [
        DepartmentComponent,
        AddDepartmentComponent,
        EditDepartmentComponent
    ],
    providers: [
        DepartmentService,
        SharedService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class DepartmentModule { }
