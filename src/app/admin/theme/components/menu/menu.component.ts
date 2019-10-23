import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    HostBinding,
    AfterViewInit,
    Inject,
    DoCheck,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { takeWhile, filter, map } from 'rxjs/operators';
import { MenuInternalService, MenuBag, VpMenuService } from './menu.service';
import { convertToBoolProperty } from '../helpers';
import { VP_WINDOW } from '../../theme.options';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MenuItem } from './menu-item';

export enum ToggleStates {
    Expanded = 'expanded',
    Collapsed = 'collapsed',
}

@Component({
    selector: '[vpMenuItem]',
    templateUrl: './menu-item.component.html',
    animations: [
        trigger('toggle', [
            state(ToggleStates.Collapsed, style({ height: '0' })),
            state(ToggleStates.Expanded, style({ height: '*' })),
            transition(`${ToggleStates.Collapsed} <=> ${ToggleStates.Expanded}`, animate(300)),
        ]),
    ],
})
export class MenuItemComponent implements DoCheck, AfterViewInit, OnDestroy {
    @Input() menuItem = <MenuItem>null;

    @Output() hoverItem = new EventEmitter<any>();
    @Output() toggleSubMenu = new EventEmitter<any>();
    @Output() selectItem = new EventEmitter<any>();
    @Output() itemClick = new EventEmitter<any>();

    private alive = true;
    toggleState: ToggleStates;

    constructor(private menuService: VpMenuService) { }

    ngDoCheck() {
        this.toggleState = this.menuItem.expanded ? ToggleStates.Expanded : ToggleStates.Collapsed;
    }

    ngAfterViewInit() {
        this.menuService.onSubmenuToggle()
            .pipe(
                takeWhile(() => this.alive),
                filter(({ item }) => item === this.menuItem),
                map(({ item }: MenuBag) => item.expanded),
            )
            .subscribe(isExpanded => this.toggleState = isExpanded ? ToggleStates.Expanded : ToggleStates.Collapsed);
    }

    ngOnDestroy() {
        this.alive = false;
    }

    onToggleSubMenu(item: MenuItem) {
        this.toggleSubMenu.emit(item);
    }

    onHoverItem(item: MenuItem) {
        this.hoverItem.emit(item);
    }

    onSelectItem(item: MenuItem) {
        this.selectItem.emit(item);
    }

    onItemClick(item: MenuItem) {
        this.itemClick.emit(item);
    }
}


@Component({
    selector: 'vp-menu',
    styleUrls: ['./menu.component.scss'],
    template: `
    <ul class="menu-items">
      <ng-container *ngFor="let item of items">
        <li vpMenuItem *ngIf="!item.hidden"
            [menuItem]="item"
            [class.menu-group]="item.group"
            (hoverItem)="onHoverItem($event)"
            (toggleSubMenu)="onToggleSubMenu($event)"
            (selectItem)="onSelectItem($event)"
            (itemClick)="onItemClick($event)"
            class="menu-item">
        </li>
      </ng-container>
    </ul>
  `,
})
export class VpMenuComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('class.inverse') inverseValue: boolean;

    /**
     * Tags a menu with some ID, can be later used in the menu service
     * to determine which menu triggered the action, if multiple menus exist on the page.
     *
     * @type {string}
     */
    @Input() tag: string;

    /**
     * List of menu items.
     * @type List<MenuItem> | List<any> | any
     */
    @Input() items: MenuItem[];

    /**
     * Makes colors inverse based on current theme
     * @type boolean
     */
    @Input()
    set inverse(val: boolean) {
        this.inverseValue = convertToBoolProperty(val);
    }

    /**
     * Collapse all opened submenus on the toggle event
     * Default value is "false"
     * @type boolean
     */
    @Input()
    set autoCollapse(val: boolean) {
        this.autoCollapseValue = convertToBoolProperty(val);
    }

    private alive = true;
    private autoCollapseValue = false;

    constructor(@Inject(VP_WINDOW) private window,
        private menuInternalService: MenuInternalService,
        private router: Router) {
    }

    ngOnInit() {
        this.menuInternalService.prepareItems(this.items);

        this.menuInternalService
            .onAddItem()
            .pipe(
                takeWhile(() => this.alive),
                filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
            )
            .subscribe(data => this.onAddItem(data));

        this.menuInternalService
            .onNavigateHome()
            .pipe(
                takeWhile(() => this.alive),
                filter((data: { tag: string; items: MenuItem[] }) => this.compareTag(data.tag)),
            )
            .subscribe(() => this.navigateHome());

        this.menuInternalService
            .onGetSelectedItem()
            .pipe(
                takeWhile(() => this.alive),
                filter((data: { tag: string; listener: BehaviorSubject<MenuBag> }) => this.compareTag(data.tag)),
            )
            .subscribe((data: { tag: string; listener: BehaviorSubject<MenuBag> }) => {
                data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
            });

        this.menuInternalService
            .onCollapseAll()
            .pipe(
                takeWhile(() => this.alive),
                filter((data: { tag: string }) => this.compareTag(data.tag)),
            )
            .subscribe(() => this.collapseAll());

        this.router.events
            .pipe(
                takeWhile(() => this.alive),
                filter(event => event instanceof NavigationEnd),
            )
            .subscribe(() => {
                this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapseValue);
            });
    }

    ngAfterViewInit() {
        setTimeout(() => this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapseValue));
    }

    onAddItem(data: { tag: string; items: MenuItem[] }) {
        this.items.push(...data.items);

        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapseValue);
    }

    onHoverItem(item: MenuItem) {
        this.menuInternalService.itemHover(item, this.tag);
    }

    onToggleSubMenu(item: MenuItem) {
        if (this.autoCollapseValue) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    }

    // TODO: is not fired on page reload
    onSelectItem(item: MenuItem) {
        this.menuInternalService.selectItem(item, this.items, this.autoCollapseValue, this.tag);
    }

    onItemClick(item: MenuItem) {
        this.menuInternalService.itemClick(item, this.tag);
    }

    ngOnDestroy() {
        this.alive = false;
    }

    private navigateHome() {
        const homeItem = this.getHomeItem(this.items);

        if (homeItem) {
            if (homeItem.link) {
                this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
            }

            if (homeItem.url) {
                this.window.location.href = homeItem.url;
            }
        }
    }

    private collapseAll() {
        this.menuInternalService.collapseAll(this.items, this.tag);
    }

    private getHomeItem(items: MenuItem[]): MenuItem {
        for (const item of items) {
            if (item.home) {
                return item;
            }

            const homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
    }

    private compareTag(tag: string) {
        return !tag || tag === this.tag;
    }

    private getSelectedItem(items: MenuItem[]): MenuItem {
        let selected = null;
        items.forEach((item: MenuItem) => {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = this.getSelectedItem(item.children);
            }
        });
        return selected;
    }
}
