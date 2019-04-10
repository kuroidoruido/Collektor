import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CollectionsService } from 'src/app/services/collections.service';

@Component({
    selector: 'app-collection-creation-page',
    templateUrl: './collection-creation-page.component.html',
    styleUrls: ['./collection-creation-page.component.scss'],
})
export class CollectionCreationPageComponent {
    form = new FormGroup({
        label: new FormControl('', Validators.required),
        template: new FormControl('[]', Validators.required),
    });

    constructor(private collectionsService: CollectionsService, private router: Router) {}

    onSubmit() {
      if(this.form.valid) {
        this.collectionsService.createCollection(this.form.value).subscribe(
          () => this.router.navigate(['/home'])
        );
      }
    }
}
