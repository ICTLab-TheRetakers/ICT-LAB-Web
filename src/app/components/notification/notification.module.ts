import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';

import { NotificationRoutingModule } from './notification.routing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../shared/services/notification.service';
import { CustomErrorHandler } from '../../shared/error-handler';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ToastyModule.forRoot(),
        NotificationRoutingModule
    ],
    exports: [NotificationComponent],
    declarations: [NotificationComponent],
    providers: [
        NotificationService,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: ErrorHandler, useClass: CustomErrorHandler }
    ]
})
export class NotificationModule { }
