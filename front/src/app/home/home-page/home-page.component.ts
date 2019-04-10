import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CollectionsService, Collection } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    collections$: Observable<Collection[]>;

    constructor(
        private collectionsService: CollectionsService,
        public router: Router
    ) {}

    ngOnInit() {
        this.collections$ = this.collectionsService.getCollections();
    }
}
