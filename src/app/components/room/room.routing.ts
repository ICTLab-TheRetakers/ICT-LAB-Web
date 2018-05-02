import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { AuthGuard } from '../../shared/authguard.service';

const routes: Routes = [
    {
        path: 'rooms',
        children: [
            { path: '', component: RoomComponent, canActivate: [AuthGuard] }
        ]
    }
]; 

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class RoomRoutingModule { }
