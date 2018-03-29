import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            { path: '', component: UserComponent },
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
export class UserRoutingModule { }
