import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { BackendModule } from 'src/app/backend/backend.module';
import { ItemGridComponent } from './item-grid.component';
import { ItemTileComponent } from './item-tile/item-tile.component';

@NgModule({
  declarations: [ItemGridComponent, ItemTileComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    BackendModule,
  ],
  exports: [ItemGridComponent],
})
export class ItemGridModule { }
