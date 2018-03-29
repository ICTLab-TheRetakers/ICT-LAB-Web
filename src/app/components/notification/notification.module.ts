import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotificationRoutingModule } from './notification.routing';

import { NotificationComponent } from './notification.component';
import { NotificationService } from '../../shared/services/notification.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        NotificationRoutingModule
    ],
    declarations: [NotificationComponent],
    providers: [
        NotificationService
    ],
})
export class NotificationModule { }
