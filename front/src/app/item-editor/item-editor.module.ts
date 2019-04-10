import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemEditorComponent } from './item-editor.component';

@NgModule({
    declarations: [ItemEditorComponent],
    imports: [CommonModule],
    exports: [ItemEditorComponent],
})
export class ItemEditorModule {}
