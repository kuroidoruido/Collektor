import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { Collektion } from 'src/app/model/Collektion';
import { isUndefined } from '../shared/assert.utils';

@UntilDestroy()
@Component({
  selector: 'app-collektion-grid',
  templateUrl: './collektion-grid.component.html',
  styleUrls: ['./collektion-grid.component.scss']
})
export class CollektionGridComponent implements OnInit {

  collektions$ = new BehaviorSubject<Collektion[] | undefined>(undefined);

  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.backend.getCollektions().pipe(
      untilDestroyed(this),
      map(collections => isUndefined(collections) || collections.length === 0 ? undefined : collections)
    ).subscribe(this.collektions$);
  }
}
