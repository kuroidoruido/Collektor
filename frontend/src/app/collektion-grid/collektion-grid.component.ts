import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';
import { isUndefined } from '../shared/assert.utils';
import { ConfirmRemoveCollektionDialog } from './confirm-remove-collektion.dialog';

function collektionLabelComparator(a: Collektion, b: Collektion): number {
  return a.label.localeCompare(b.label);
}

@UntilDestroy()
@Component({
  selector: 'app-collektion-grid',
  templateUrl: './collektion-grid.component.html',
  styleUrls: ['./collektion-grid.component.scss']
})
export class CollektionGridComponent implements OnInit {

  collektions$ = new BehaviorSubject<Collektion[] | undefined>(undefined);

  constructor(private backend: BackendService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshCollektions();
  }
  
  private refreshCollektions(): void {
    this.backend.getCollektions().pipe(
      untilDestroyed(this),
      map(collections => isUndefined(collections) || collections.length === 0 ? undefined : collections),
      map(collections => collections?.sort(collektionLabelComparator)),
    ).subscribe(collections => this.collektions$.next(collections));
  }

  goToAddPage(): void {
    this.router.navigate(['/collection/add']);
  }

  onRemoveClick(collektion: Collektion): void {
    const dialogRef = this.dialog.open(ConfirmRemoveCollektionDialog, { data: { collektion } });
    dialogRef.afterClosed().pipe(
      mergeMap(() => this.backend.deleteCollektion(collektion.id)),
    ).subscribe(collektionId => {
      this.refreshCollektions();
    });
  }
}
