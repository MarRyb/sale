import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Category } from 'src/app/core/interfaces/post';
import { CategoryManagementService } from '../category.service';
import { takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-category-managment',
    templateUrl: './category-managment.component.html',
    styleUrls: ['./category-managment.component.scss']
})
export class CategoryManagmentComponent implements OnInit, OnDestroy {

    categories: Category[];
    titleCreateCategory: string = 'Добавить новую категорию';
    createCategoryRef: BsModalRef;
    isEditCategory: boolean = false;
    currentCategory: Category;
    private ngOnDestroy$: ReplaySubject<null> = new ReplaySubject<null>();

    constructor(private categoryService: CategoryManagementService,
                private modalService: BsModalService) { }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
        this.categoryService.getCategories()
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(categories => this.categories = categories);
    }


    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

    onClickAddCategory(template: TemplateRef<any>) {
        this.titleCreateCategory = 'Добавить новую категорию';
        this.isEditCategory = false;
        this.createCategoryRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    onClickEditCategory(template: TemplateRef<any>, category: Category) {
        this.currentCategory = category;
        this.titleCreateCategory = 'Редактирование категории';
        this.isEditCategory = true;
        this.createCategoryRef = this.modalService.show(template, { class: 'modal-lg' });
    }

    onDeleteCategory(category: Category, parent?: Category) {
        this.categoryService.deleteCategory(category.id)
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(() => {
                if (parent) {
                    parent.children = parent.children.filter(item => item.id !== category.id);
                    this.updateCategoryList(parent);
                } else {
                    this.categories = this.categories.filter(item => item.id !== category.id);
                }
            });
    }

    trackById(entity: Category): number {
        return entity.id;
    }

    private updateCategoryList(category: Category) {
        this.categories = this.categories.map(item => item.id === category.id ?
            { ...item, ...category } : item);
    }

}
