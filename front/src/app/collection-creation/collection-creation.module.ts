import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCreationPageComponent } from './collection-creation-page/collection-creation-page.component';

@NgModule({
    declarations: [CollectionCreationPageComponent],
    imports: [CommonModule],
    exports: [CollectionCreationPageComponent],
})
export class CollectionCreationModule {}
