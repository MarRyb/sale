import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Category } from 'src/app/core/interfaces/post';
import { CategoryManagementService } from '../category.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-category-managment',
    templateUrl: './category-managment.component.html',
    styleUrls: ['./category-managment.component.scss']
})
export class CategoryManagmentComponent implements OnInit, OnDestroy {

    categories: Category[];
    private ngOnDestroy$: ReplaySubject<null> = new ReplaySubject<null>();

    constructor(private categoryService: CategoryManagementService) { }

    ngOnInit() {
        this.categoryService.getCategories()
            .pipe(takeUntil(this.ngOnDestroy$))
            .subscribe(categories => this.categories = categories);

    }


    ngOnDestroy() {
        this.ngOnDestroy$.next(null);
        this.ngOnDestroy$.complete();
    }

    onClickAddCategory() {

    }

}
