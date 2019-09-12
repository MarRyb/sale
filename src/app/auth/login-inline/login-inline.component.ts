import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../service/auth.service';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-inline',
    templateUrl: './login-inline.component.html',
    styleUrls: ['./login-inline.component.sass']
})
export class LoginInlineComponent implements OnInit {

    public loginForm: FormGroup;
    public phoneItem: any;
		public emailItem: any;
		public errorArray = [];

    constructor(
        private router: Router,
        private api: ApiService,
        private auth: AuthService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }

    onSubmit() {
        const value = this.loginForm.getRawValue();
        this.auth.authUser(this.createAuthData(value)).subscribe(
            res => {
                this.router.navigate(['/']);
						},
						error => {
							this.errorArray = error.error.error.exception;
							return this.errorArray;

						});
    }

    onKeyEnter() {
        if (this.loginForm.valid) {
            this.onSubmit();
        }
    }


    createAuthData(value) {
        return ({
            username: value.email.toLowerCase().replace(/\s/g, ''),
            password: value.password
        });
    }

}

