import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';
import { AuthGuard } from '../../shared/authguard.service';
import { AddRoomComponent } from './add-room/add-room.component';

const routes: Routes = [
    {
        path: 'rooms',
        children: [
            { path: '', component: RoomComponent, canActivate: [AuthGuard] },
            { path: 'add', component: AddRoomComponent, canActivate: [AuthGuard] }
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
