import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollektionGridModule, CollektionGridComponent } from './collektion-grid';
import { EditCollektionModule, AddCollektionComponent, EditCollektionComponent } from './edit-collektion';
import { ItemGridModule, ItemGridComponent } from './item-grid';
import { NotFoundComponent, NotFoundModule } from './not-found';

const routes: Routes = [
  { path: '', component: CollektionGridComponent, pathMatch: 'full'},
  { path: 'collection/add', component: AddCollektionComponent},
  { path: 'collection/:collektionId', component: ItemGridComponent},
  { path: 'collection/edit/:collektionId', component: EditCollektionComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotFoundModule, CollektionGridModule, EditCollektionModule, ItemGridModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
