/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
    Component,
    ChangeDetectionStrategy,
    Host,
    HostBinding,
    HostListener,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { takeWhile } from 'rxjs/operators';

import { VpAccordionItemComponent } from './accordion-item.component';

/**
 * Component intended to be used within `<vp-accordion-item>` component
 */
@Component({
    selector: 'vp-accordion-item-header',
    styleUrls: ['./accordion-item-header.component.scss'],
    template: `
    <ng-content select="vp-accordion-item-title"></ng-content>
    <ng-content select="vp-accordion-item-description"></ng-content>
    <ng-content></ng-content>
    <span class ="expansion-indicator" *ngIf="!disabled">
    <i [@expansionIndicator]="state"  class="fa fa-chevron-down"></i>
    </span>
  `,
    animations: [
        trigger('expansionIndicator', [
            state(
                'expanded',
                style({
                    transform: 'rotate(180deg)',
                }),
            ),
            transition('collapsed => expanded', animate('100ms ease-in')),
            transition('expanded => collapsed', animate('100ms ease-out')),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpAccordionItemHeaderComponent implements OnInit, OnDestroy {

    private alive: boolean = true;

    @HostBinding('class.accordion-item-header-collapsed')
    get isCollapsed(): boolean {
        return this.accordionItem.collapsed;
    }

    @HostBinding('class.accordion-item-header-expanded')
    @HostBinding('attr.aria-expanded')
    get expanded(): boolean {
        return !this.accordionItem.collapsed;
    }

    @HostBinding('attr.tabindex')
    get tabbable(): string {
        return this.accordionItem.disabled ? '-1' : '0';
    }

    @HostBinding('attr.aria-disabled')
    get disabled(): boolean {
        return this.accordionItem.disabled;
    }

    @HostListener('click')
    toggle() {
        this.accordionItem.toggle();
    }

    get state(): string {
        if (this.isCollapsed) {
            return 'collapsed';
        }
        if (this.expanded) {
            return 'expanded';
        }
    }


    constructor(@Host() private accordionItem: VpAccordionItemComponent, private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.accordionItem.accordionItemInvalidate
            .pipe(takeWhile(() => this.alive))
            .subscribe(() => this.cd.markForCheck());
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
