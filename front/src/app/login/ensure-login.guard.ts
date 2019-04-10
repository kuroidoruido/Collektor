import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services';

@Injectable({
    providedIn: 'root',
})
export class EnsureLoginGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot
    ): Observable<boolean> {
        return next.url[0].path === 'login'
            ? of(true)
            : this.authenticationService.getCurrentSession().pipe(
                  map(authInfo => typeof authInfo['jwt'] !== 'undefined'),
                  tap(isLogged => {
                      if (!isLogged) {
                          this.router.navigate(['/login']);
                      }
                  })
              );
    }
}
