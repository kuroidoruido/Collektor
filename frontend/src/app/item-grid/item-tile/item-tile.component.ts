import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Collektion, CollektionItemField } from 'src/app/model/Collektion';

import { CollektionItem } from 'src/app/model/CollektionItem';

@Component({
  selector: 'app-item-tile',
  templateUrl: './item-tile.component.html',
  styleUrls: ['./item-tile.component.scss']
})
export class ItemTileComponent {
  @Input() collektion: Collektion | undefined;
  @Input() item: CollektionItem | undefined;
  @Output() remove = new EventEmitter<CollektionItem>();

  private getCustomField<T>(customFields: CollektionItem['customFields'], def: CollektionItemField): T {
    return (customFields[def.key] as any) as T;
  }

  getCustomFieldAsBoolean(customFields: CollektionItem['customFields'], def: CollektionItemField): boolean {
    return this.getCustomField<boolean>(customFields, def);
  }

  getCustomFieldAsInteger(customFields: CollektionItem['customFields'], def: CollektionItemField): number {
    return this.getCustomField<number>(customFields, def);
  }

  getCustomFieldAsText(customFields: CollektionItem['customFields'], def: CollektionItemField): string {
    return this.getCustomField<string>(customFields, def);
  }

  getCustomFieldAsDate(customFields: CollektionItem['customFields'], def: CollektionItemField): Date {
    return this.getCustomField<Date>(customFields, def);
  }
}
