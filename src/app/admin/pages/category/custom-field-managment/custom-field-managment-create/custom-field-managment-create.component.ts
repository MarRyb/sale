import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomField } from 'src/app/core/interfaces/post';
import { filter, takeUntil } from 'rxjs/operators';
import { CustomFieldService } from '../../custom-field.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-custom-field-managment-create',
    templateUrl: './custom-field-managment-create.component.html',
    styleUrls: ['./custom-field-managment-create.component.scss']
})
export class CustomFieldManagmentCreateComponent implements OnInit, OnDestroy {
    currentType: any;
    showParams: boolean = false;
    @Input()
    public get customField(): CustomField {
        return this._customField;
    }
    public set customField(value: CustomField) {
        this._customField = value;
        if (value) {
            this.createCategoryForm();
            this.getCustomFieldList();
            this.customFieldForm.patchValue({
                ...value,
                parent: value.parent && value.parent.id
            });

            if (!(value.type === 'input' || value.type === 'textarea')) {
                this.showParams = true;
                this.pathParams(value);
            }
            this.registerChangeType();
        }
    }
    // tslint:disable-next-line:variable-name
    private _customField: CustomField;

    // tslint:disable-next-line:no-output-native
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<Partial<CustomField>> = new EventEmitter();
    customFieldForm: FormGroup;
    customFieldType = [
        {
            type: 'input',
            name: 'single-line text input'
        }, {
            type: 'select',
            name: 'drop down select'
        }, {
            type: 'radio',
            name: 'radio buttons'
        }, {
            type: 'checkbox',
            name: 'checkboxes select'
        }, {
            type: 'textarea',
            name: 'multi-line text input'
        }
    ];

    private params = {};
    private pageToLoadNext = 1;
    private loading = false;
    totalCount: number;
    customFields: CustomField[];
    private ngOnDestroy$: Subject<null> = new Subject<null>();

    constructor(private fb: FormBuilder,
        // tslint:disable-next-line:align
        private customFieldService: CustomFieldService) { }

    ngOnInit() {
        if (!this.customField) {
            this.createCategoryForm();
            this.registerChangeType();
            this.getCustomFieldList();
        }
    }

    createCategoryForm() {
        this.customFieldForm = this.fb.group({
            name: ['', Validators.required],
            type: [null, Validators.required],
            parent: [null],
            value: this.fb.array([]),
        });
    }

    registerChangeType() {
        this.customFieldForm.controls.type
            .valueChanges
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(value => {
                if (value === 'input' || value === 'textarea') {
                    this.showParams = false;
                    this.customFieldForm.removeControl('value');
                } else {
                    this.showParams = true;
                    this.customFieldForm.addControl('value', this.fb.array([
                        this.fb.group({
                            label: ['', Validators.required],
                            value: ['', Validators.required]
                        })
                    ]));
                }
            });
    }

    cancelCreate() {
        this.close.emit(false);
    }

    onSubmit() {
        const payload = this.customFieldForm.getRawValue();
        this.create.emit(payload);
        this.customFieldForm.reset();
        this.showParams = false;
    }

    getCustomFieldList() {
        if (this.loading) {
            return;
        }
        this.loading = true;

        if (this.pageToLoadNext > 1) {
            this.params = { ...this.params, ...{ page: this.pageToLoadNext } };
        }
        this.customFieldService.getCustomFields(this.params)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(customFields => {
                this.totalCount = customFields.total_count;
                this.customFields = this.customFields ? [...this.customFields, ...customFields.items] : customFields.items;
                this.loading = false;
                this.pageToLoadNext++;
            });
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

    get formParams() {
        return this.customFieldForm.get('value') as FormArray;
    }


    addParams() {
        if (!this.formParams.value) {
            this.formParams.setValue([]);
        }
        this.formParams.push(
            this.fb.group({
                label: ['', Validators.required],
                value: ['', Validators.required]
            }));
    }

    pathParams(param: CustomField) {
        param.value.map(item => {
            this.formParams.push(
                this.fb.group({
                    label: item.label,
                    value: item.value
                }),
            );
        });
    }

    remoteParams(index: number) {
        this.formParams.removeAt(index);
    }

}
