import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import User from './models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('loggedInUser')) {
            let user = JSON.parse(sessionStorage.getItem('loggedInUser')) as User;
            let roles = route.data["roles"] as Array<number>;

            if (roles != null && roles.length > 0) {
                if (roles.length == 1) {
                    if (user.role_id == roles[0]) {
                        return true;
                    }
                } else {
                    if (roles.indexOf(user.role_id) != -1) {
                        return true;
                    }
                }
            }

            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}
