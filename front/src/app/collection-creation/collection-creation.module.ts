import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { ServicesModule } from 'src/app/services';

import { CollectionCreationPageComponent } from './collection-creation-page/collection-creation-page.component';

@NgModule({
    declarations: [CollectionCreationPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,

        ServicesModule
    ],
    exports: [CollectionCreationPageComponent],
})
export class CollectionCreationModule {}
