import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { BackendModule } from 'src/app/backend/backend.module';
import { AddButtonModule } from 'src/app/shared/add-button/add-button.module';
import { ConfirmRemoveItemDialog } from './confirm-remove-item.dialog';
import { ItemGridComponent } from './item-grid.component';
import { ItemTileComponent } from './item-tile/item-tile.component';
import { YesOrNoPipe } from './yes-or-no-pipe/yes-or-no.pipe';

@NgModule({
  declarations: [ItemGridComponent, ItemTileComponent, YesOrNoPipe, ConfirmRemoveItemDialog],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BackendModule,
    AddButtonModule,
  ],
  exports: [ItemGridComponent],
})
export class ItemGridModule { }
