import {
  Component,
  ChangeDetectionStrategy,
  Host,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { takeWhile } from 'rxjs/operators';

import { VpAccordionItemComponent } from './accordion-item.component';

const accordionItemBodyTrigger = trigger('accordionItemBody', [
  state(
    'collapsed',
    style({
      overflow: 'hidden',
      visibility: 'hidden',
      height: 0,
    }),
  ),
  state(
    'expanded',
    style({
      overflow: 'hidden',
      visibility: 'visible',
    }),
  ),
  transition('collapsed => expanded', animate('100ms ease-in')),
  transition('expanded => collapsed', animate('100ms ease-out')),
]);

/**
 * Component intended to be used within `<vp-accordion-item>` component
 */
@Component({
  selector: 'vp-accordion-item-body',
  template: `
    <div [@accordionItemBody]="{ value: state }">
      <div class="item-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [accordionItemBodyTrigger],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VpAccordionItemBodyComponent implements OnInit, OnDestroy {
  private alive: boolean = true;

  constructor(@Host() private accordionItem: VpAccordionItemComponent, private cd: ChangeDetectorRef) {}

  get state(): string {
    return this.accordionItem.collapsed ? 'collapsed' : 'expanded';
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
