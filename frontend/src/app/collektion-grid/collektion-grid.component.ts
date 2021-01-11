import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';
import { isUndefined } from '../shared/assert.utils';

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

  constructor(private backend: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.backend.getCollektions().pipe(
      untilDestroyed(this),
      map(collections => isUndefined(collections) || collections.length === 0 ? undefined : collections),
      map(collections => collections?.sort(collektionLabelComparator)),
    ).subscribe(this.collektions$);
  }

  goToAddPage(): void {
    this.router.navigate(['/collection/add']);
  }
}
