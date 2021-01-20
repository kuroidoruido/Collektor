import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { ImageSelectorComponent } from './image-selector.component';
import { BackendModule } from 'src/app/backend/backend.module';

@NgModule({
  declarations: [ImageSelectorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    BackendModule,
  ],
  exports: [ImageSelectorComponent],
})
export class ImageSelectorModule { }
