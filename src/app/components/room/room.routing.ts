import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoomComponent } from './room.component';

const routes: Routes = [
    {
        path: 'rooms',
        children: [
            { path: '', component: RoomComponent, pathMatch: 'full' }
            //{ path: 'add', component: AddRoomComponent },
            //{ path: 'details/:id', component: DetailRoomComponent },
            //{ path: 'edit/:id', component: EditRoomComponent }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class RoomRoutingModule { }
