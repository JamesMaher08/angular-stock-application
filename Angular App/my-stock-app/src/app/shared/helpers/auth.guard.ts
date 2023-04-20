import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(private router:Router, private accountService:AccountService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("Checking");
        const user = this.accountService.userValue;

        console.log("User:", user);

        if (user) {
            // user is authorized
            console.log("Authorized");
            return true;
        }
        console.log("Not Authrorized");
        // user is not authorized redirect to login page with the return url
        console.log("state:", state.url);
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        // this.router.navigate(['/account/login']);
        return false;
    }
}