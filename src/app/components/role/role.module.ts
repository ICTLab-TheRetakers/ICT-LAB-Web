import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { RoleRoutingModule } from './role.routing';

import { RoleComponent } from './role.component';
import { RoleService } from '../../shared/services/role.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        RoleRoutingModule
    ],
    declarations: [RoleComponent],
    providers: [
        RoleService,
        { provide: LocationStrategy, useClass: PathLocationStrategy } 
    ]
})
export class RoleModule { }
