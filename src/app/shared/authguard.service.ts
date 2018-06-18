import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import User from './models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('loggedInUser')) {
            let user = JSON.parse(sessionStorage.getItem('loggedInUser')) as User;
            let roles = route.data["roles"] as Array<string>;

            if (roles != null) {
                if (roles.filter(f => f == user.role)[0]) {
                    return true
                } else {
                    return false;
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
