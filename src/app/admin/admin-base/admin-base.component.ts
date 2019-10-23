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
            title: 'Отчеты',
            icon: 'fa fa-bar-chart',
            link: '/vp-admin/reports',
            children: [
                {
                    title: 'Посетители',
                    icon: 'fa fa-user-secret',
                    link: '/vp-admin/reports/visitors',
                },
                {
                    title: 'Зарегистрированные',
                    icon: 'fa fa-users',
                    link: '/vp-admin/reports/registered',
                },
                {
                    title: 'Посты',
                    icon: 'fa fa-newspaper-o',
                    link: '/vp-admin/reports/posts',
                },

            ],
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
