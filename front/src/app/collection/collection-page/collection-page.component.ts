import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CollectionsService, Collection } from 'src/app/services';

@Component({
    selector: 'app-collection-page',
    templateUrl: './collection-page.component.html',
    styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent implements OnInit {
    collection$: Observable<Collection>;

    constructor(
        private collectionService: CollectionsService,
        public router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.collection$ = this.route.params.pipe(
            map(params => params.id),
            switchMap(collectionId =>
                this.collectionService.getCollection(collectionId)
            )
        );
    }
}
