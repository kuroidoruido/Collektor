import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { CollectionsService } from './collections.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [AuthenticationService, CollectionsService],
})
export class ServicesModule {}
