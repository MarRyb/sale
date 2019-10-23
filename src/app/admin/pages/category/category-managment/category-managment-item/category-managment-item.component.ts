import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Category } from 'src/app/core/interfaces/post';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'app-category-managment-item',
    templateUrl: './category-managment-item.component.html',
    styleUrls: ['./category-managment-item.component.scss']
})
export class CategoryManagmentItemComponent {

    isHover: boolean;

    @Input()
    get category() {
        return this.categoryValue;
    }
    set category(val: Category) {
        this.categoryValue = val;
    }
    private categoryValue: Category;

    @Output() update: EventEmitter<Category> = new EventEmitter<Category>();

    @Output() edit: EventEmitter<Category> = new EventEmitter<Category>();

    @Output() delete: EventEmitter<Category> = new EventEmitter<Category>();

    private url = environment.URL;

    constructor(private domSanitizer: DomSanitizer) { }

    @HostListener('mouseenter') mouseover() {
        this.isHover = true;
    }

    @HostListener('mouseleave') mouseout() {
        this.isHover = false;
    }

    getCategoryImage(): SafeStyle {
        return this.category.image && this.domSanitizer.bypassSecurityTrustStyle(`url('${this.url + this.category.image.path}')`);
    }

    updateAvatar(event: MouseEvent) {
        event.stopPropagation();
        this.update.emit(this.category);
    }

    editCategory(event: MouseEvent) {
        event.stopPropagation();
        this.edit.emit(this.category);
    }

    deleteCategory(event: MouseEvent) {
        event.stopPropagation();
        this.delete.emit(this.category);
    }

}
