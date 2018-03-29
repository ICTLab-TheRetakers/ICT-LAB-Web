import { NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user.routing';

import { UserComponent } from './user.component';
import { UserService } from '../../shared/services/user.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        UserRoutingModule
    ],
    declarations: [UserComponent],
    providers: [
        UserService,
        { provide: LocationStrategy, useClass: PathLocationStrategy }
    ],
})
export class UserModule { }
