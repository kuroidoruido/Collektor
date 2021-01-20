import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, mergeMap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { isDefined } from 'src/app/shared/assert.utils';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent  {
  collektionId$ = this.activatedRoute.paramMap.pipe(map(params => params.get('collektionId')));
  collektion$ = this.collektionId$.pipe(filter(isDefined), mergeMap(collektionId => this.backend.getCollektion(collektionId)));

  constructor(private backend: BackendService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  onSave(newItem: Omit<CollektionItem, 'id'>): void {
    this.collektionId$.pipe(
      first(),
      filter(isDefined),
      mergeMap(collektionId => this.backend.createCollektionItem(collektionId, newItem))
    ).subscribe(savedItem => {
      this.router.navigate(['']);
      this.snackBar.open(`Item ${savedItem.label} saved!`, 'Close');
    });
  }
}
