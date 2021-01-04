import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { BackendModule } from 'src/app/backend/backend.module';
import { CollektionGridComponent } from './collektion-grid.component';
import { CollektionTileComponent } from './collektion-tile/collektion-tile.component';

@NgModule({
  declarations: [CollektionGridComponent, CollektionTileComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    BackendModule,
  ],
  exports: [CollektionGridComponent],
})
export class CollektionGridModule { }
