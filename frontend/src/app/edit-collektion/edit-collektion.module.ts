import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

import { EditCollektionComponent } from './edit-collektion/edit-collektion.component';
import { AddCollektionComponent } from './add-collektion/add-collektion.component';
import { CollektionFormComponent } from './collektion-form/collektion-form.component';
import { CommonFormElementsModule } from 'src/app/shared/common-form-elements.module';

@NgModule({
  declarations: [AddCollektionComponent, EditCollektionComponent, CollektionFormComponent],
  imports: [
    CommonModule,
    CommonFormElementsModule,
    RouterModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  exports: [AddCollektionComponent, EditCollektionComponent],
})
export class EditCollektionModule {}
