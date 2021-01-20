import { Component, Input } from '@angular/core';

import { CollektionItem } from 'src/app/model/CollektionItem';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent {
  @Input() collektionId = 'unknown';
  @Input() item: CollektionItem | undefined;
}
