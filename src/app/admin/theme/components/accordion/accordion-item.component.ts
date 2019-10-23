
import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    HostBinding,
    Host,
    OnInit,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { VpAccordionComponent } from './accordion.component';
import { convertToBoolProperty } from '../helpers';

@Component({
    selector: 'vp-accordion-item',
    styleUrls: ['./accordion-item.component.scss'],
    template: `
    <ng-content select="vp-accordion-item-header"></ng-content>
    <ng-content select="vp-accordion-item-body"></ng-content>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpAccordionItemComponent implements OnInit, OnChanges, OnDestroy {

    @Input('collapsed')
    @HostBinding('class.collapsed')
    get collapsed(): boolean {
        return this.collapsedValue;
    }
    set collapsed(val: boolean) {
        this.collapsedValue = convertToBoolProperty(val);
        this.collapsedChange.emit(this.collapsedValue);
        this.invalidate();
    }

    @Input('expanded')
    @HostBinding('class.expanded')
    get expanded(): boolean {
        return !this.collapsed;
    }
    set expanded(val: boolean) {
        this.collapsedValue = !convertToBoolProperty(val);
    }

    @Input('disabled')
    @HostBinding('class.disabled')
    get disabled(): boolean {
        return this.disabledValue;
    }
    set disabled(val: boolean) {
        this.disabledValue = convertToBoolProperty(val);
        this.invalidate();
    }

    @Output() collapsedChange = new EventEmitter<boolean>();

    accordionItemInvalidate = new Subject<boolean>();

    private collapsedValue = true;
    private disabledValue = false;
    private alive = true;

    constructor(@Host() private accordion: VpAccordionComponent, private cd: ChangeDetectorRef) {
    }

    toggle() {
        if (!this.disabled) {
            // we need this temporary variable as `openCloseItems.next` will change current value we need to save
            const willSet = !this.collapsed;

            if (!this.accordion.multi) {
                this.accordion.openCloseItems.next(true);
            }
            this.collapsed = willSet;
        }
    }

    open() {
        // tslint:disable-next-line:no-unused-expression
        !this.disabled && (this.collapsed = false);
    }

    close() {
        // tslint:disable-next-line:no-unused-expression
        !this.disabled && (this.collapsed = true);
    }

    ngOnInit() {
        this.accordion.openCloseItems
            .pipe(takeWhile(() => this.alive))
            .subscribe(collapsed => {
                // tslint:disable-next-line:no-unused-expression
                !this.disabled && (this.collapsed = collapsed);
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        this.accordionItemInvalidate.next(true);
    }

    ngOnDestroy() {
        this.alive = false;
        this.accordionItemInvalidate.complete();
    }

    private invalidate() {
        this.accordionItemInvalidate.next(true);
        this.cd.markForCheck();
    }
}
