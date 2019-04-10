import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
} from '@angular/material';

import { ServicesModule } from 'src/app/services';

@NgModule({
    declarations: [NavigationComponent],
    imports: [
        CommonModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,

        ServicesModule,
    ],
    exports: [NavigationComponent],
})
export class NavigationModule {}
