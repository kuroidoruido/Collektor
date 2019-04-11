import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { ItemCreationPageComponent } from './item-creation-page/item-creation-page.component';
import { ItemEditorModule } from 'src/app/item-editor';

@NgModule({
    declarations: [ItemCreationPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        ItemEditorModule,
    ],
    exports: [ItemCreationPageComponent],
})
export class ItemCreationModule {}
