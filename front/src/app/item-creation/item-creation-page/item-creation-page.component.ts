import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CollectionsService } from 'src/app/services/collections.service';

@Component({
    selector: 'app-item-creation-page',
    templateUrl: './item-creation-page.component.html',
    styleUrls: ['./item-creation-page.component.scss'],
})
export class ItemCreationPageComponent {
  private collectionId: number;
    form = new FormGroup({
        label: new FormControl('', Validators.required),
        tags: new FormControl('', Validators.required),
        fields: new FormControl('', Validators.required),
    });

    constructor(
        private collectionsService: CollectionsService,
        private router: Router,
        route: ActivatedRoute
    ) {
        this.collectionId = route.snapshot.params.collectionId;
    }
    //collectionId
    onSubmit() {
        if (this.form.valid) {
            this.collectionsService
                .createItem({
                    fromCollection: this.collectionId,
                    ...this.form.value,
                })
                .subscribe(() => this.router.navigate(['/collection', this.collectionId]));
        }
    }
}
