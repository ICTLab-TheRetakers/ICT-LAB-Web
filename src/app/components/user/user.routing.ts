import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { AuthGuard } from '../../shared/authguard.service';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    {
        path: 'users',
        children: [
            { path: '', component: UserComponent, canActivate: [AuthGuard] },
            { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard] }
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
export class UserRoutingModule { }
