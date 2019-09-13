import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../service/auth.service';
import { GeoService } from '../../service/geo.service';
import { takeWhile } from 'rxjs/operators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';



@Component({
    selector: 'app-register-info',
    templateUrl: './register-info.component.html',
    styleUrls: ['./register-info.component.sass']
})
export class RegisterInfoComponent implements OnInit, OnDestroy {

    public userInfoForm: FormGroup;
    public registerStatus = false;
    @Output() changeRegistrationState = new EventEmitter();
    bsConfig: Partial<BsDatepickerConfig>;
    private alive = true;
    public isDisabledRegion = true;
    public isDisabledCity = true;
    public countries: { id: number, name: string }[];
    public regions: { id: number, name: string }[];
    public cities: { id: number, name: string }[];
    public selectedCountry: { id: number, name: string } = { id: null, name: 'Выберите страну' };

    constructor(
        private api: ApiService,
        private geoService: GeoService,
        private fb: FormBuilder,
        public authService: AuthService,
        public router: Router
    ) {
        this.bsConfig = Object.assign({}, { containerClass: 'theme-red', locale: 'ru', rangeInputFormat: 'DD.MM.YYYY' });
    }

    ngOnInit() {
        this.initForm();
        this.getCountries();
        this.registerChangeGeo();
    }

    initForm() {
        this.userInfoForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            firstName: this.fb.group({
                name: ['', [Validators.required, Validators.minLength(3)]],
                visibility: ['0'],
            }),
            lastName: this.fb.group({
                name: ['', [Validators.required, Validators.minLength(3)]],
                visibility: ['0'],
            }),
            birthday: this.fb.group({
                date: ['', [Validators.required]],
                visibility: ['0'],
            }),
            sex: this.fb.group({
                sex: ['', [Validators.required]],
                visibility: ['0'],
            }),
            phone: this.fb.group({
                name: [''],
                visibility: ['0'],
            }),
            country: ['', [Validators.required]],
            region: ['', [Validators.required]],
            city: ['', [Validators.required]],
            recaptcha: [false, Validators.required],
            url: [`${location.origin}/update-password/`]
        });
    }

    submit() {
        const controls = this.userInfoForm.controls;
        if (this.userInfoForm.invalid) {
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        } else {
            this.authService.registerUser(this.userInfoForm.value)
                .pipe(
                    takeWhile(() => this.alive))
                .subscribe(
                    response => {
                        setTimeout(() => {
                            this.router.navigate(['']);
                        }, 5000);
                        return this.registerStatus = true;
                    },
                    err => {
                        // console.log(err.error.error.code, err.error.error.exception[0].message);
                        if (+(err.error.error.code === 400 && err.error.error.exception[0].message === 'This email already exists')) {
                            alert('Такой емейл уже зарегистрирован');
                        } else if (+(err.error.error.code === 500 && err.error.error.exception[0].message === 'Not valid phone number')) {
                            alert('Неправильный номер телефона');
                            // tslint:disable-next-line:max-line-length
                        } else if (+(err.error.error.code === 400 && err.error.error.exception[0].message === 'This phone already exists')) {
                            alert('Такой номер уже зарегистрирован');
                        }
                    });
        }
    }

    registerChangeGeo() {
        this.userInfoForm.get('country')
            .valueChanges.pipe(
                takeWhile(() => this.alive))
            .subscribe(value => this.selectCountry(value));
        this.userInfoForm.get('region')
            .valueChanges.pipe(
                takeWhile(() => this.alive))
            .subscribe(value => this.selectRegion(value));
    }

    getCountries() {
        this.geoService.getCountries().pipe(
            takeWhile(() => this.alive)).subscribe(countries => this.countries = countries);
    }

    private selectCountry(countryId: number) {
        if (Number(countryId) >= 0) {
            this.geoService.getRegions(countryId).pipe(
                takeWhile(() => this.alive))
                .subscribe(regions => this.regions = regions);
            this.isDisabledRegion = false;
        }
    }

    private selectRegion(regionId: number) {
        if (Number(regionId) >= 0) {
            this.geoService.getCities(regionId).pipe(
                takeWhile(() => this.alive))
                .subscribe(cities => this.cities = cities);
            this.isDisabledCity = false;
        }
    }

    ngOnDestroy() {
        this.alive = false;
    }


}
