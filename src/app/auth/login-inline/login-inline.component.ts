import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CurrentUserService } from './../../core/services/current-user.service';
@Component({
    selector: 'app-login-inline',
    templateUrl: './login-inline.component.html',
    styleUrls: ['./login-inline.component.scss']
})
export class LoginInlineComponent implements OnInit {

    public loginForm: FormGroup;
    public phoneItem: any;
    public emailItem: any;
    public errorArray = [];

    constructor(
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder,
        private currentUserService: CurrentUserService,
        @Inject(LOCAL_STORAGE) private localStorage: any
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
                this.localStorage.setItem('auth', JSON.stringify(res));
                this.currentUserService.authenticate();
                this.router.navigate(['/categories']);
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


    createAuthData(value: any) {
        return ({
            username: value.email.toLowerCase().replace(/\s/g, ''),
            password: value.password
        });
    }

}

