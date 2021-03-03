import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { filter, first, map, mergeMap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { isDefined, isUndefined } from 'src/app/shared/assert.utils';
import { ConfirmRemoveItemDialog } from './confirm-remove-item.dialog';

function collektionItemLabelComparator(a: CollektionItem, b: CollektionItem): number {
  return a.label.localeCompare(b.label);
}

@UntilDestroy()
@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {
  collektionId$ = new BehaviorSubject<string | null>(null);
  collektion$ = new BehaviorSubject<Collektion | undefined>(undefined);
  items$ = new BehaviorSubject<CollektionItem[] | undefined>(undefined);

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private backend: BackendService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      untilDestroyed(this),
      map(params => params.get('collektionId'))
    ).subscribe(this.collektionId$);
    this.collektionId$.pipe(
      untilDestroyed(this),
      filter(isDefined),
      mergeMap(collektionId => this.backend.getCollektionItems(collektionId)),
      map(items => isUndefined(items) || items.length === 0 ? undefined : items),
      map(items => items?.sort(collektionItemLabelComparator)),
    ).subscribe(this.items$);
    this.collektionId$.pipe(
      untilDestroyed(this),
      filter(isDefined),
      mergeMap(collektionId => this.backend.getCollektion(collektionId))
    ).subscribe(this.collektion$);
  }

  goToAddItem(): void {
    this.collektionId$.pipe(first()).subscribe(collektionId => {
      this.router.navigate([`/collection/${collektionId}/item/add`]);
    })
  }

  onRemoveClick(item: CollektionItem): void {
    const dialogRef = this.dialog.open(ConfirmRemoveItemDialog, { data: { item } });
    dialogRef.afterClosed().pipe(
      mergeMap(() => this.collektionId$),
      first(),
      mergeMap(collektionId => this.backend.deleteCollektionItem(collektionId!, item.id).pipe(map(() => collektionId))),
    ).subscribe(collektionId => {
      this.collektionId$.next(collektionId);
    });
  }
}

