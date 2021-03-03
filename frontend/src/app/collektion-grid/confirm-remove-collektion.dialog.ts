import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Collektion } from 'src/app/model/Collektion';

export interface ConfirmRemoveCollektionDialogData {
  collektion: Collektion;
}

@Component({
  selector: 'confirm-remove-item-dialog',
  template: `
  <h2 mat-dialog-title>Can confirm you want to remove {{collektion.label}}?</h2>
  <mat-dialog-content class="mat-typography">
    <p>Removing an item is definitive and cannot be cancelled.</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Remove</button>
  </mat-dialog-actions>
  `,
})
export class ConfirmRemoveCollektionDialog {
  collektion: Collektion;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmRemoveCollektionDialogData) {
    this.collektion = data.collektion;
  }
}
