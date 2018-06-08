import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { CustomErrorHandler } from '../../shared/error-handler';

import { UserRoutingModule } from './user.routing';

import { UserComponent } from './user.component';
import { UserService } from '../../shared/services/user.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DetailsUserComponent } from './details-user/details-user.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        UserRoutingModule
    ],
    declarations: [UserComponent, SignInComponent, AddUserComponent, EditUserComponent, DetailsUserComponent],
    providers: [
        UserService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ],
    exports: [
        UserComponent
    ]
})
export class UserModule { }
