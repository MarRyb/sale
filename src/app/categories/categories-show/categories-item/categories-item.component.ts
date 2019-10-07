import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/core/interfaces/post';

@Component({
    selector: 'app-categories-item',
    templateUrl: './categories-item.component.html',
    styleUrls: ['./categories-item.component.sass']
})
export class CategoriesItemComponent implements OnInit {
    @Input() posts: Post[];
    constructor() {
    }

    ngOnInit() {
    }

}
