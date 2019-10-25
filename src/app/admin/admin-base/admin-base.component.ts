import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VpSidebarService } from '../theme/components/sidebar/sidebar.service';

@Component({
    selector: 'app-admin-base',
    templateUrl: './admin-base.component.html',
    styleUrls: ['./admin-base.component.scss']
})
export class AdminBaseComponent implements OnInit, OnDestroy {

    constructor(private sidebarService: VpSidebarService,
                private titleService: Title) { }

    sidebarMenuItems = [
        {
            title: 'Главная',
            icon: 'fa fa-home',
            link: '/vp-admin/dashboard',
            home: true,
        },
        {
            title: 'Категории',
            icon: 'fa fa-folder-open-o',
            link: '/vp-admin/categories',
            children: [
                {
                    title: 'Менеджер категорий',
                    icon: 'fa fa-list-alt',
                    link: '/vp-admin/categories/managment',
                },
                {
                    title: 'Дополнительные поля',
                    icon: 'fa fa-cc',
                    link: '/vp-admin/categories/custom-field',
                },
            ],
        },
    ];

    ngOnInit() {
        this.titleService.setTitle(`Администрирование - Впотоке`);
    }


    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    ngOnDestroy() {
    }
}
