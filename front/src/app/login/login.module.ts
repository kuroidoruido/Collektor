import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';

import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
    declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    exports: [LoginPageComponent],
})
export class LoginModule {}
