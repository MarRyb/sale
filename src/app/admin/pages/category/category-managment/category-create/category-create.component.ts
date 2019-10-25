import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subject, OperatorFunction, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CategoryManagementService } from '../../category.service';
import { Category, CustomField } from 'src/app/core/interfaces/post';
import { environment } from 'src/environments/environment';
import { CustomFieldService } from '../../custom-field.service';

@Component({
    selector: 'app-category-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
    public buttonTitle = 'Создать';
    public categoryForm: FormGroup;
    dismissible = true;
    public alerts: Array<any> = [];
    editForm = false;
    private categoryValue: Category;
    url = environment.URL;
    private pageToLoadNext = 1;
    private loading = false;
    totalCount: number;
    customFields: CustomField[];

    @Input() categories: Category[];
    fileData: File;
    previewUrl: string | ArrayBuffer;

    @Input() set editable(val: boolean) {
        if (val) {
            this.editForm = true;
            this.buttonTitle = 'Обновить';
        } else {
            this.editForm = false;
            this.buttonTitle = 'Создать';
            if (this.categoryForm) {
                this.categoryForm.reset();
            }
        }

    }

    @Input() set category(val: Category) {
        if (val) {
            this.categoryValue = val;
            this.previewUrl = val.image && this.url + val.image.path;
            if (this.editForm) {
                this.initForm();
                this.categoryForm.patchValue({
                    ...val,
                    parent: val.parent.id ? val.parent.id : null,
                    customFields: (val.customFields || []).map(cf => cf.id)
                });
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
        // tslint:disable:align
        private customFieldService: CustomFieldService,
        private categoryService: CategoryManagementService,
    ) { }

    ngOnInit() {
        if (!this.editForm) {
            this.initForm();
        }
        this.getCustomFieldList();
    }

    initForm() {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            slug: [''],
            parent: [null],
            customFields: [null],
        });
    }

    onSubmit() {
        if (this.editForm) {
            this.onUpdateCategory();
        } else {
            this.onCreateCategory();
        }
    }

    onUpdateCategory() {
        const payload = this.categoryForm.getRawValue();
        this.categoryService.editCategory(this.category.id, payload)
            .pipe(
                this.uploadImage(),
                takeUntil(this.ngOnDestroy$))
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
            .pipe(
                this.uploadImage(),
                takeUntil(this.ngOnDestroy$))
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

    onFileChange(fileInput: Event) {
        this.fileData = fileInput.target && (fileInput.target as HTMLInputElement).files[0] as File;
        this.previewImage();
    }

    previewImage() {
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) === null) {
            return;
        }

        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileData);
        fileReader.onload = (event: Event) => {
            this.previewUrl = fileReader.result;
        };
    }

    removeUploadFile() {
        if (this.category && this.category.image) {
            this.removeCategoryImage();
        }
        this.fileData = null;
        this.previewUrl = null;
    }

    private removeCategoryImage() {
        this.categoryService.deleteCategoryImage(this.category.id)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(res => {
                this.updateCategory.emit(res);
            });
    }

    onClosed(dismissedAlert: any): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }

    private uploadImage(): OperatorFunction<Category, Category> {
        return switchMap((category: Category) => {
            if (this.fileData) {
                return this.categoryService.uploadCategoryImage(category.id, this.fileData);
            } else {
                return of(category);
            }
        });
    }


    getCustomFieldList() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        let params = {};
        if (this.pageToLoadNext > 1) {
            params = { ...params, ...{ page: this.pageToLoadNext } };
        }
        this.customFieldService.getCustomFields(params)
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
}
