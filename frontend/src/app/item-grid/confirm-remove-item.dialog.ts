import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CollektionItem } from 'src/app/model/CollektionItem';

export interface ConfirmRemoveItemDialogData {
  item: CollektionItem;
}

@Component({
  selector: 'confirm-remove-item-dialog',
  template: `
  <h2 mat-dialog-title>Can confirm you want to remove {{item.label}}?</h2>
  <mat-dialog-content class="mat-typography">
    <p>Removing an item is definitive and cannot be cancelled.</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Remove</button>
  </mat-dialog-actions>
  `,
})
export class ConfirmRemoveItemDialog {
  item: CollektionItem;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmRemoveItemDialogData) {
    this.item = data.item;
  }
}
