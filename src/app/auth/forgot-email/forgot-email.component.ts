import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'app-forgot-email',
    templateUrl: './forgot-email.component.html',
    styleUrls: ['./forgot-email.component.scss']
})
export class ForgotEmailComponent implements OnInit {
    public emailForm: FormGroup;
    public emailSend = false;
    private alive = true;

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.createEmailForm();
    }

    private createEmailForm() {
        this.emailForm = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            recaptcha: [false, Validators.required]
        });
    }

    onSubmit() {
        const email = this.emailForm.controls.email.value.toString().toLowerCase();
        const keys = Object.keys(this.emailForm.value);

        this.authService.updatePassWithMail(email)
            .pipe(
                takeWhile(() => this.alive),
                tap(
                    res => {
                        this.emailSend = true;
                    },
                    err => {
                        const errors = this.getErrosCode(err.error.error.code) || 'Что-то пошло не так';
                        keys.forEach(val => {
                            this.pushErrorFor(val, errors);
                        });
                        this.emailForm.controls.recaptcha.reset();
                    }))
            .subscribe();
    }

    private pushErrorFor(ctrlName: string, msg: string) {
        this.emailForm.controls[ctrlName].setErrors({ msg });
    }

    private getErrosCode(error: number): string {
        switch (error) {
            case 400:
                return 'Пользователь с таким email адресом не зарегистрирован';
            case 500:
                return 'Ошибка сервера, попробуйте позже';
            default:
                return 'Что-то пошло не так';
        }
    }

}
