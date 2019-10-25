import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomField } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-custom-field-managment-create',
    templateUrl: './custom-field-managment-create.component.html',
    styleUrls: ['./custom-field-managment-create.component.scss']
})
export class CustomFieldManagmentCreateComponent implements OnInit {
    @Input()
    public get customField(): CustomField {
        return this._customField;
    }
    public set customField(value: CustomField) {
        this._customField = value;
        this.createCategoryForm();
        this.customFieldForm.patchValue(value);
    }
    // tslint:disable-next-line:variable-name
    private _customField: CustomField;

    // tslint:disable-next-line:no-output-native
    @Output() close: EventEmitter<boolean> = new EventEmitter();
    @Output() create: EventEmitter<Partial<CustomField>> = new EventEmitter();
    customFieldForm: FormGroup;
    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        if (!this.customField) {
            this.createCategoryForm();
        }
    }

    createCategoryForm() {
        this.customFieldForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required]
        });
    }

    cancelCreate() {
        this.close.emit(false);
    }

    onSubmit() {
        const payload = this.customFieldForm.getRawValue();
        this.create.emit(payload);
        this.customFieldForm.reset();
    }

}
