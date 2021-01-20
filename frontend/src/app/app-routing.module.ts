import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollektionGridModule, CollektionGridComponent } from './collektion-grid';
import { EditCollektionModule, AddCollektionComponent, EditCollektionComponent } from './edit-collektion';
import { AddItemComponent } from './edit-item/add-item/add-item.component';
import { EditItemModule } from './edit-item/edit-item.module';
import { EditItemComponent } from './edit-item/edit-item/edit-item.component';
import { ItemGridModule, ItemGridComponent } from './item-grid';
import { NotFoundComponent, NotFoundModule } from './not-found';

const routes: Routes = [
  { path: '', component: CollektionGridComponent, pathMatch: 'full'},
  { path: 'collection/add', component: AddCollektionComponent},
  { path: 'collection/:collektionId', component: ItemGridComponent},
  { path: 'collection/edit/:collektionId', component: EditCollektionComponent},
  { path: 'collection/:collektionId/item/add', component: AddItemComponent},
  { path: 'collection/:collektionId/item/:itemId', component: EditItemComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NotFoundModule, CollektionGridModule, EditCollektionModule, ItemGridModule, EditItemModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
