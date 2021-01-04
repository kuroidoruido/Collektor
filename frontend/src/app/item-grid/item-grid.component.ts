import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { BackendService } from 'src/app/backend/backend.service';
import { CollektionItem } from 'src/app/model/CollektionItem';
import { isDefined, isUndefined } from 'src/app/shared/assert.utils';

@UntilDestroy()
@Component({
  selector: 'app-item-grid',
  templateUrl: './item-grid.component.html',
  styleUrls: ['./item-grid.component.scss']
})
export class ItemGridComponent implements OnInit {


  items$ = new BehaviorSubject<CollektionItem[] | undefined>(undefined);

  constructor(private activatedRoute: ActivatedRoute, private backend: BackendService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      untilDestroyed(this),
      map(params => params.get('collektionId')),
      filter(isDefined),
      mergeMap(collektionId => this.backend.getCollektionItem(collektionId)),
      map(items => isUndefined(items) || items.length === 0 ? undefined : items)
    ).subscribe(this.items$);
  }
}
