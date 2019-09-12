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

    constructor(
        private router: Router,
        private api: ApiService,
        private auth: AuthService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            pass: ['', Validators.required],
            rememberMe: [''],
        });
    }

    onSubmit() {
        const value = this.loginForm.getRawValue();
        // this.auth.authUser(this.createAuthData(value)).subscribe(
        //     res => {
        //         this.router.navigate(['/']);
        //     }
        // );
    }

    onKeyEnter() {
        if (this.loginForm.valid) {
            this.onSubmit();
        }
    }


    createAuthData(value) {
        return ({
            userName: value.email.toLowerCase().replace(/\s/g, ''),
            pass: value.pass
        });
    }

}

