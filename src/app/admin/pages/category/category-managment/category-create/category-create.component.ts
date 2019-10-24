import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryManagementService } from '../../category.service';
import { Category } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
    public title = 'Добавить новую категорию';
    public buttonTitle = 'Создать';
    public categoryForm: FormGroup;
    dismissible = true;
    public alerts: Array<any> = [];
    editForm = false;
    private categoryValue: Category;

    @Input() categories: Category[];

    @Input() set editable(val: boolean) {
        if (val) {
            this.editForm = true;
            this.title = 'Редактирование категории';
            this.buttonTitle = 'Обновить';
        } else {
            this.editForm = false;
            this.title = 'Добавить новую категорию';
            this.buttonTitle = 'Создать';
            if (this.categoryForm) {
                this.categoryForm.reset();
            }
        }

    }

    @Input() set category(val: Category) {
        if (val) {
            this.categoryValue = val;
            if (this.editForm) {
                this.initForm();
                this.categoryForm.patchValue(val);
            }
        }
    }
    get category() {
        return this.categoryValue;
    }

    @Output() addCategory = new EventEmitter();

    @Output() updateCategory = new EventEmitter();

    private ngOnDestroy$: Subject<null> = new Subject<null>();

    constructor(private fb: FormBuilder,
        // tslint:disable-next-line:align
        private categoryService: CategoryManagementService) { }

    ngOnInit() {
        if (!this.editForm) {
            this.initForm();
        }
    }

    initForm() {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            // slug: [''],
            parent: [null],
            customFields: this.fb.array([]),
        });
    }

    onSubmit() {
        if (this.editForm) {
            this.onUpdateCategory();
        } else {
            this.onCreateCategory();
        }
    }

    get formCustomField() {
        return this.categoryForm.controls.customFields as FormArray;
    }


    addCustomField() {
        this.formCustomField.push(
            this.fb.group({
                name: ['', Validators.required],
                type: ['', Validators.required]
            }));
    }

    remoteCustomField(index: number) {
        this.formCustomField.removeAt(index);
    }


    onUpdateCategory() {
        const payload = this.categoryForm.getRawValue();
        this.categoryService.editCategory(this.category.id, payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(res => {
                this.updateCategory.emit(res);
                this.alerts.push(
                    {
                        type: 'success',
                        msg: `Вы успешно обновили категорию ${this.category.name}.`
                    }
                );
                this.categoryForm.reset();
            });
    }

    onCreateCategory() {
        const payload = this.categoryForm.getRawValue();
        this.categoryService.createCategory(payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(res => {
                this.addCategory.emit(res);
                this.alerts.push(
                    {
                        type: 'success',
                        msg: `Вы успешно создали категорию.`
                    }
                );
                this.categoryForm.reset();
            });
    }

    onClosed(dismissedAlert: any): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }
}
