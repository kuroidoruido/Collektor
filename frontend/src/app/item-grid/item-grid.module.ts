import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { BackendModule } from 'src/app/backend/backend.module';
import { AddButtonModule } from 'src/app/shared/add-button/add-button.module';
import { ItemGridComponent } from './item-grid.component';
import { ItemTileComponent } from './item-tile/item-tile.component';

@NgModule({
  declarations: [ItemGridComponent, ItemTileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    BackendModule,
    AddButtonModule,
  ],
  exports: [ItemGridComponent],
})
export class ItemGridModule { }
