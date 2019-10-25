import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CustomFieldService } from '../custom-field.service';
import { CustomField } from 'src/app/core/interfaces/post';
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

    constructor(private customFieldService: CustomFieldService) { }

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

    onClickAddCustomField(show: boolean) {
        this.showAddCustomField = show;
    }

    onAddCustomField(payload: { name: string }) {
        this.showAddCustomField = false;
        this.customFieldService.createCustomField(payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(customField => {
                this.customFields = [customField, ...this.customFields];
            });
    }

    onEditCustomField(customField: CustomField, payload: Partial<CustomField> ) {
        this.customFieldService.editCustomField(customField.id, payload)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(customFieldRes => {
                this.updateCustomFieldList(customFieldRes);
            });
    }
}
