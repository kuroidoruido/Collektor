import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemEditionPageComponent } from './item-edition-page/item-edition-page.component';
import { ItemEditorModule } from 'src/app/item-editor';

@NgModule({
    declarations: [ItemEditionPageComponent],
    imports: [CommonModule, ItemEditorModule],
    exports: [ItemEditionPageComponent],
})
export class ItemEditionModule {}
