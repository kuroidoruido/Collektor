import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { FabModule } from 'src/app/fab';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { ItemComponent } from './item/item.component';

@NgModule({
    declarations: [CollectionPageComponent, ItemComponent],
    imports: [CommonModule, MatCardModule, FabModule],
    exports: [CollectionPageComponent],
})
export class CollectionModule {}
