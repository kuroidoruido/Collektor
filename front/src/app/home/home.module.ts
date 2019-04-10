import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
} from '@angular/material';

import { ServicesModule } from 'src/app/services';

import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,

        MatButtonModule,
        MatCardModule,
        MatIconModule,

        ServicesModule,
    ],
    exports: [HomePageComponent],
})
export class HomeModule {}
