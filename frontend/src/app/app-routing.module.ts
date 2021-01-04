import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollektionGridComponent } from './collektion-grid/collektion-grid.component';
import { CollektionGridModule } from './collektion-grid/collektion-grid.module';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemGridModule } from './item-grid/item-grid.module';

const routes: Routes = [
  { path: '', component: CollektionGridComponent, pathMatch: 'full'},
  { path: 'collection/:collektionId', component: ItemGridComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CollektionGridModule, ItemGridModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
