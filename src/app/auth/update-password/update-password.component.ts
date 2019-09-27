import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap, takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.sass']
})
export class UpdatePasswordComponent implements OnInit, OnDestroy {
    updatePasswordForm: FormGroup;
    updatePasswordSubs: Subscription;
    token: string;
    email: string;
    id: string;
    passwordReset = false;
    private alive = true;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ) {
}

    ngOnInit() {
        this.route.queryParams.pipe(
            takeWhile(() => this.alive))
            .subscribe(params => {
                this.token = params.token;
            });
        this.initForm();
    }

    ngOnDestroy() {
        this.alive = false;
    }

    onSubmit() {
        const values = this.updatePasswordForm.value;
        const keys = Object.keys(values);

        if (this.updatePasswordForm.valid) {
            this.authService
                .updatePassword(this.token, values)
                .pipe(
                    takeWhile(() => this.alive),
                    tap(
                        res => (this.passwordReset = true),
                        user => {
                            const errors = this.getErrosCode(user.error.error.code) || 'Что-то пошло не так';
                            keys.forEach(val => {
                                this.pushErrorFor(val, errors);
                            });
                        }
                    )
                )
                .subscribe();
        } else {
            keys.forEach(val => {
                const ctrl = this.updatePasswordForm.controls[val];
                if (!ctrl.valid) {
                    this.pushErrorFor(val, null);
                    ctrl.markAsTouched();
                }
            });
        }
    }

    private pushErrorFor(ctrlName: string, msg: string) {
        this.updatePasswordForm.controls[ctrlName].setErrors({ msg });
    }

    initForm() {
        const password = '';
        const confirmPassword = '';

        this.updatePasswordForm = this.fb.group(
            {
                password: [
                    password,
                    Validators.compose([Validators.required, Validators.minLength(6)])
                ],
                confirm_password: [
                    confirmPassword,
                    Validators.compose([Validators.required, Validators.minLength(6)])
                ],
            },
            { validator: this.matchingPasswords({ passwordKey: 'password', confirmPasswordKey: 'confirm_password' }) }
        );
    }

    matchingPasswords({ passwordKey, confirmPasswordKey }: { passwordKey: string; confirmPasswordKey: string; }) {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        };
    }

    private getErrosCode(error: number): string {
        switch (error) {
            case 400:
                return 'Время жизни токена истекло, отправте повторный запрос';
            case 500:
                return 'Ошибка сервера, попробуйте позже';
            default:
                return 'Что-то пошло не так';
        }
    }
}
