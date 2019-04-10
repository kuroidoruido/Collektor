import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
    AuthenticationService,
    AuthInfo,
    AuthNotLogged,
    CollectionsService,
    Collection
} from 'src/app/services';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    session: AuthInfo;
    showSideNav: boolean = false;
    collections$: Observable<Collection[]>;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authenticationService: AuthenticationService,
        private collectionsService: CollectionsService,
        public router: Router
    ) {}

    ngOnInit() {
        this.authenticationService.getCurrentSession()
        .pipe(catchError(err => of({message: `An error occured: ${err.message}`})))
        .subscribe((s : AuthInfo | AuthNotLogged) => {
          if(typeof s['jwt'] === 'undefined') {
            this.showSideNav = false;
            delete this.session;
          } else {
            this.showSideNav = true;
            this.session = s as AuthInfo;
          }
        });
        this.collections$ = this.collectionsService.getCollections();
    }

    logout() {
      this.authenticationService.logout();
    }
}
