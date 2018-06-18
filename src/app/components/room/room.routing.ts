import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../shared/authguard.service';

import { RoomComponent } from './room.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { ImportRoomComponent } from './import-room/import-room.component';

const routes: Routes = [
    {
        path: 'rooms',
        children: [
            { path: '', component: RoomComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'add', component: AddRoomComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'edit/:room', component: EditRoomComponent, canActivate: [AuthGuard], data: { roles: [1] } },
            { path: 'import', component: ImportRoomComponent, canActivate: [AuthGuard], data: { roles: [1] } }
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
