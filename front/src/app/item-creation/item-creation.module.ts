import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCreationPageComponent } from './item-creation-page/item-creation-page.component';
import { ItemEditorModule } from 'src/app/item-editor';

@NgModule({
    declarations: [ItemCreationPageComponent],
    imports: [CommonModule, ItemEditorModule],
    exports: [ItemCreationPageComponent],
})
export class ItemCreationModule {}
