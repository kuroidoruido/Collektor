import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from 'src/app/services';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    form: FormGroup;

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        this.form = new FormGroup({
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        });
    }
    onSubmit() {
        const data = this.form.value;
        this.authService
            .login(data.login, data.password)
            .subscribe(() => this.router.navigate(['home']));
    }
}
