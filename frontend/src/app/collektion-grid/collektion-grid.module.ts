import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { BackendModule } from 'src/app/backend/backend.module';
import { AddButtonModule } from '../shared/add-button/add-button.module';
import { CollektionGridComponent } from './collektion-grid.component';
import { CollektionTileComponent } from './collektion-tile/collektion-tile.component';
import { ConfirmRemoveCollektionDialog } from './confirm-remove-collektion.dialog';

@NgModule({
  declarations: [CollektionGridComponent, CollektionTileComponent, ConfirmRemoveCollektionDialog],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDialogModule,
    AddButtonModule,
    BackendModule,
  ],
  exports: [CollektionGridComponent],
})
export class CollektionGridModule { }
