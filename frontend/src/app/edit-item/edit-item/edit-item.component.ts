import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { isDefined } from 'src/app/shared/assert.utils';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent {
  collektionId$ = this.activatedRoute.paramMap.pipe(map(params => params.get('collektionId')));
  itemId$ = this.activatedRoute.paramMap.pipe(map(params => params.get('itemId')));
  collektion$ = this.collektionId$.pipe(filter(isDefined), mergeMap(collektionId => this.backend.getCollektion(collektionId)));
  item$ = combineLatest([this.collektionId$, this.itemId$]).pipe(
    filter(isDefined),
    filter((tuple): tuple is [string,string] => isDefined(tuple[0]) && isDefined(tuple[1])),
    mergeMap(([collektionId, itemId]) => this.backend.getCollektionItem(collektionId, itemId))
  );

  constructor(private backend: BackendService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  onSave(newItem: CollektionItem): void {
    this.collektionId$.pipe(
      first(),
      filter(isDefined),
      mergeMap(collektionId => this.backend.updateCollektionItem(collektionId, newItem).pipe(
        tap(() => this.router.navigate(['/collection', collektionId]))
      ))
    ).subscribe(savedItem => {
      this.snackBar.open(`Item ${savedItem.label} saved!`, 'Close');
    });
  }
}
