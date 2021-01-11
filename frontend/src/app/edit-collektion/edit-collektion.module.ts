import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { EditCollektionComponent } from './edit-collektion/edit-collektion.component';
import { AddCollektionComponent } from './add-collektion/add-collektion.component';
import { CollektionFormComponent } from './collektion-form/collektion-form.component';
import { ImageSelectorComponent } from './image-selector/image-selector.component';

@NgModule({
  declarations: [AddCollektionComponent, EditCollektionComponent, CollektionFormComponent, ImageSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  exports: [AddCollektionComponent, EditCollektionComponent],
})
export class EditCollektionModule {}
