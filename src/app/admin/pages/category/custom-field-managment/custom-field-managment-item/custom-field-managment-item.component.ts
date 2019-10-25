import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { CustomField } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-custom-field-managment-item',
    templateUrl: './custom-field-managment-item.component.html',
    styleUrls: ['./custom-field-managment-item.component.scss']
})
export class CustomFieldManagmentItemComponent {
    @Input()
    public get customField(): CustomField {
        return this._customField;
    }
    public set customField(value: CustomField) {
        this._customField = value;
    }
    // tslint:disable-next-line:variable-name
    private _customField: CustomField;
    @Output() edit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<CustomField> = new EventEmitter();
    isHover: boolean;
    showEdit: boolean;

    constructor() { }

    onEditCustomField(payload: { name: string }) {
        this.edit.emit(payload);
        this.showEdit = false;
    }

    deleteCustomField(event: MouseEvent) {
        event.stopPropagation();
        this.delete.emit(this.customField);
    }

    @HostListener('mouseenter') mouseover() {
        this.isHover = true;
    }

    @HostListener('mouseleave') mouseout() {
        this.isHover = false;
    }

    onClickEditCustomField(show: boolean) {
        this.showEdit = show;
    }

}
