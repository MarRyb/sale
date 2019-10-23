import { map, delay, filter } from 'rxjs/operators';
import {
    Component,
    Input,
    Output,
    EventEmitter,
    ContentChildren,
    QueryList,
    AfterContentInit,
    HostBinding,
    ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { convertToBoolProperty } from '../helpers';


@Component({
    selector: 'vp-tab',
    template: `
    <ng-container *ngIf="init">
      <ng-content></ng-content>
    </ng-container>
  `,
})
export class VpTabComponent {

    @Input() tabTitle: string;

    @Input() tabIcon: string;

    @Input() tabImage: string;

    @Input() tabCount: number;

    @Input()
    set responsive(val: boolean) {
        this.responsiveValue = convertToBoolProperty(val);
    }

    get responsive() {
        return this.responsiveValue;
    }

    @Input() route: string;

    @Input() id: number;

    @HostBinding('class.content-active')
    activeValue = false;

    responsiveValue = false;

    hideValue = false;

    @Input()
    get active() {
        return this.activeValue;
    }
    set active(val: boolean) {
        this.activeValue = convertToBoolProperty(val);
        // this.activeValue = val;
        if (this.activeValue) {
            this.init = true;
        }
    }

    @Input()
    get hide() {
        return this.hideValue;
    }
    set hide(val: boolean) {
        this.hideValue = convertToBoolProperty(val);
    }

    /**
     * Lazy load content before tab selection
     * TODO: rename, as lazy is by default, and this is more `instant load`
     *
     */
    @Input()
    set lazyLoad(val: boolean) {
        this.init = convertToBoolProperty(val);
    }

    @Input() badgeText: string;

    @Input() badgeStatus: string;

    @Input() badgePosition: string;

    init = false;
}


@Component({
    selector: 'vp-tabset',
    styleUrls: ['./tabset.component.scss'],
    template: `
    <ul class="tabset" *ngIf="showHeader">
      <li *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.responsive]="tab.responsive"
          [class.active]="tab.active"
          [class.hide]="tab.hide"
          class="tab">
        <a href (click)="$event.preventDefault()">
          <i *ngIf="tab.tabIcon" [class]="tab.tabIcon"></i>
          <span *ngIf="tab.tabImage" class="tab-image"><img [src]="tab.tabImage"></span>
          <span *ngIf="tab.tabTitle">{{ tab.tabTitle }}</span>
          <span *ngIf="tab.tabCount" class="tab-count">{{ tab.tabCount }}</span>
        </a>
        <app-badge *ngIf="tab.badgeText"
          [text]="tab.badgeText"
          [status]="tab.badgeStatus"
          [position]="tab.badgePosition">
        </app-badge>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
})
export class VpTabsetComponent implements AfterContentInit {

    @ContentChildren(VpTabComponent) tabs: QueryList<VpTabComponent>;

    @HostBinding('class.full-width')
    fullWidthValue = false;
    showHeaderVal = true;

    @Input()
    set fullWidth(val: boolean) {
        this.fullWidthValue = convertToBoolProperty(val);
    }

    @Input() routeParam: string;

    @Input() set showHeader(val: boolean) {
        this.showHeaderVal = convertToBoolProperty(val);
    }
    get showHeader() {
        return this.showHeaderVal;
    }

    @Input() set reset(val: boolean) {
        if (val) {
            this.selectTab(this.tabs.first);
            this.changeDetectorRef.markForCheck();
        }
    }

    @Output() changeTab: EventEmitter<any> = new EventEmitter<any>();


    constructor(private route: ActivatedRoute,
                private changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.route.params
            .pipe(
                map(
                    (params: any) =>
                        this.tabs.find((tab) => this.routeParam ? tab.route === params[this.routeParam] : tab.active),
                ),
                delay(0),
                map((tab: VpTabComponent) => tab || this.tabs.first),
                filter((tab: VpTabComponent) => !!tab),
              )
              .subscribe((tabToSelect: VpTabComponent) => {
                this.selectTab(tabToSelect);
                this.changeDetectorRef.markForCheck();
              });
    }

    selectTab(selectedTab: VpTabComponent) {
        this.tabs.forEach(tab => tab.active = tab === selectedTab);
        this.changeDetectorRef.markForCheck();
        this.changeTab.emit(selectedTab);
    }
}
