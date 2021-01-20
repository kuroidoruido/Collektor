import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { CommonFormElementsModule } from '../shared/common-form-elements.module';


@NgModule({
  declarations: [AddItemComponent, EditItemComponent, ItemFormComponent],
  imports: [
    CommonModule,
    CommonFormElementsModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class EditItemModule { }
