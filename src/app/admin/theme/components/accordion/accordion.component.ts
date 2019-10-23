import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';

/**
 * <vp-accordion>
 *  <vp-accordion-item>
 *   <vp-accordion-item-header>Product Details</vp-accordion-item-header>
 *   <vp-accordion-item-body>
 *     Item Content
 *   </vp-accordion-item-body>
 *  </vp-accordion-item>
 * </vp-accordion>
 */
@Component({
    selector: 'vp-accordion',
    styleUrls: ['./accordion.component.scss'],
    template: `
    <ng-content select="vp-accordion-item"></ng-content>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpAccordionComponent {

    openCloseItems = new Subject<boolean>();

    @Input('multi')
    get multi(): boolean {
        return this.multiValue;
    }
    set multi(val: boolean) {
        this.multiValue = convertToBoolProperty(val);
    }

    private multiValue = false;

    openAll() {
        if (this.multi) {
            this.openCloseItems.next(false);
        }
    }


    closeAll() {
        this.openCloseItems.next(true);
    }
}
