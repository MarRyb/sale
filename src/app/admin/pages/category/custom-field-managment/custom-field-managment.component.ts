import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomFieldService } from '../custom-field.service';
import { CustomField } from 'src/app/core/interfaces/post';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
    selector: 'app-custom-field-managment',
    templateUrl: './custom-field-managment.component.html',
    styleUrls: ['./custom-field-managment.component.scss']
})
export class CustomFieldManagmentComponent implements OnInit, OnDestroy {
    private params = {};
    private pageToLoadNext = 1;
    private loading = false;
    totalCount: number;
    customFields: CustomField[];
    private ngOnDestroy$: Subject<null> = new Subject<null>();
    currentcustomField: CustomField;
    showAddCustomField: boolean;
    titleCreateCustomField: string = 'Добавить новую категорию';
    createCustomFieldRef: BsModalRef;
    isEditCustomField: boolean;
    currentCustomField: CustomField;

    constructor(private customFieldService: CustomFieldService,
                private modalService: BsModalService) { }

    ngOnInit() {
        this.getCustomFieldList();
    }

    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
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

    onScroll() {
        this.getCustomFieldList();
    }

    private updateCustomFieldList(customField: CustomField) {
        this.customFields = this.customFields.map(item => item.id === customField.id ?
            { ...item, ...customField } : item);
    }

    confirmDeleteCustomField(customField: CustomField) {
        this.customFieldService.deleteCustomField(customField.id)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(() => {
                this.customFields = this.customFields.filter(item => item !== customField);
            });
    }

    onClickAddCustomField(template: TemplateRef<any>) {
        this.currentCustomField = null;
        this.titleCreateCustomField = 'Добавить дополнительное поле';
        this.isEditCustomField = false;
        this.createCustomFieldRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    onClickEditCustomField(template: TemplateRef<any>, customField: CustomField) {
        this.currentCustomField = customField;
        this.titleCreateCustomField = 'Редактирование дополнительного поля';
        this.isEditCustomField = true;
        this.createCustomFieldRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    onSubmit(payload: Partial<CustomField>) {
        if (this.isEditCustomField) {
            this.onEditCustomField(this.currentCustomField, payload);
            this.createCustomFieldRef.hide();
        } else {
            this.onAddCustomField(payload);
        }
    }

    onAddCustomField(payload: Partial<CustomField>) {
        this.customFieldService.createCustomField(payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(customField => {
                this.customFields = [customField, ...this.customFields];
            });
    }

    onEditCustomField(customField: CustomField, payload: Partial<CustomField>) {
        this.customFieldService.editCustomField(customField.id, payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(customFieldRes => {
                this.updateCustomFieldList(customFieldRes);
            });
    }
}
