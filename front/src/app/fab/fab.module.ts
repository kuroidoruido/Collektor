import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatRippleModule } from '@angular/material';

import { FabComponent } from './fab.component';

@NgModule({
    declarations: [FabComponent],
    imports: [CommonModule, MatButtonModule, MatRippleModule],
    exports: [FabComponent],
})
export class FabModule {}
