import { Component, HostBinding, Input, OnInit, OnDestroy, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { convertToBoolProperty } from '../helpers';
import { VpSidebarService } from './sidebar.service';
import { ThemeService } from '../../service/theme.service';
import { MediaBreakpoint } from '../../service/breakpoints.service';



@Component({
    selector: 'vp-sidebar-header',
    template: `
    <ng-content></ng-content>
  `,
})
export class VpSidebarHeaderComponent {
}


@Component({
    selector: 'vp-sidebar-footer',
    template: `
    <ng-content></ng-content>
  `,
})
export class VpSidebarFooterComponent {
}

@Component({
    selector: 'vp-sidebar',
    styleUrls: ['./sidebar.component.scss'],
    template: `
    <div class="main-container"
         [class.main-container-fixed]="containerFixedValue">
      <ng-content select="vp-sidebar-header"></ng-content>
      <div class="scrollable" (click)="onClick($event)">
        <ng-content></ng-content>
      </div>
      <ng-content select="vp-sidebar-footer"></ng-content>
    </div>
  `,
})
export class VpSidebarComponent implements OnChanges, OnInit, OnDestroy {

    static readonly STATE_EXPANDED: string = 'expanded';
    static readonly STATE_COLLAPSED: string = 'collapsed';
    static readonly STATE_COMPACTED: string = 'compacted';

    static readonly RESPONSIVE_STATE_MOBILE: string = 'mobile';
    static readonly RESPONSIVE_STATE_TABLET: string = 'tablet';
    static readonly RESPONSIVE_STATE_PC: string = 'pc';

    protected stateValue: string;
    protected responsiveValue = false;

    private alive = true;

    containerFixedValue = true;

    @HostBinding('class.fixed') fixedValue = false;
    @HostBinding('class.right') rightValue = false;
    @HostBinding('class.left') leftValue = true;
    @HostBinding('class.start') startValue = false;
    @HostBinding('class.end') endValue = false;

    // TODO: rename stateValue to state (take a look to the card component)
    @HostBinding('class.expanded')
    get expanded() {
        return this.stateValue === VpSidebarComponent.STATE_EXPANDED;
    }
    @HostBinding('class.collapsed')
    get collapsed() {
        return this.stateValue === VpSidebarComponent.STATE_COLLAPSED;
    }
    @HostBinding('class.compacted')
    get compacted() {
        return this.stateValue === VpSidebarComponent.STATE_COMPACTED;
    }

    @Input()
    set right(val: boolean) {
        this.rightValue = convertToBoolProperty(val);
        this.leftValue = !this.rightValue;
        this.startValue = false;
        this.endValue = false;
    }


    @Input()
    set left(val: boolean) {
        this.leftValue = convertToBoolProperty(val);
        this.rightValue = !this.leftValue;
        this.startValue = false;
        this.endValue = false;
    }


    @Input()
    set start(val: boolean) {
        this.startValue = convertToBoolProperty(val);
        this.endValue = !this.startValue;
        this.leftValue = false;
        this.rightValue = false;
    }


    @Input()
    set end(val: boolean) {
        this.endValue = convertToBoolProperty(val);
        this.startValue = !this.endValue;
        this.leftValue = false;
        this.rightValue = false;
    }


    @Input()
    set fixed(val: boolean) {
        this.fixedValue = convertToBoolProperty(val);
    }


    @Input()
    set containerFixed(val: boolean) {
        this.containerFixedValue = convertToBoolProperty(val);
    }


    @Input()
    set state(val: string) {
        this.stateValue = val;
    }


    @Input()
    set responsive(val: boolean) {
        this.responsiveValue = convertToBoolProperty(val);
    }

    @Input() tag: string;


    @Input() compactedBreakpoints: string[] = ['xs', 'is', 'sm', 'md', 'lg'];


    @Input() collapsedBreakpoints: string[] = ['xs', 'is'];

    private mediaQuerySubscription: Subscription;
    private responsiveState = VpSidebarComponent.RESPONSIVE_STATE_PC;

    constructor(private sidebarService: VpSidebarService,
                private themeService: ThemeService,
                private element: ElementRef) {
    }

    toggleResponsive(enabled: boolean) {
        if (enabled) {
            this.mediaQuerySubscription = this.onMediaQueryChanges();
        } else if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.responsive) {
            this.toggleResponsive(this.responsiveValue);
        }
    }

    ngOnInit() {
        this.sidebarService.onToggle()
            .pipe(takeWhile(() => this.alive))
            .subscribe((data: { compact: boolean, tag: string }) => {
                if (!this.tag || this.tag === data.tag) {
                    this.toggle(data.compact);
                }
            });

        this.sidebarService.onExpand()
            .pipe(takeWhile(() => this.alive))
            .subscribe((data: { tag: string }) => {
                if (!this.tag || this.tag === data.tag) {
                    this.expand();
                }
            });

        this.sidebarService.onCollapse()
            .pipe(takeWhile(() => this.alive))
            .subscribe((data: { tag: string }) => {
                if (!this.tag || this.tag === data.tag) {
                    this.collapse();
                }
            });
    }

    ngOnDestroy() {
        this.alive = false;
        if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    }

    onClick(event: any): void {
        const menu = this.element.nativeElement.querySelector('vp-menu');

        if (menu && menu.contains(event.target)) {
            let link = event.target;
            const linkChildren = ['span', 'i'];

            // if we clicked on span - get the link
            if (linkChildren.includes(link.tagName.toLowerCase()) && link.parentNode) {
                link = event.target.parentNode;
            }

            // we only expand if an item has children
            if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
                this.expand();
            }
        }
    }


    collapse() {
        this.state = VpSidebarComponent.STATE_COLLAPSED;
    }


    expand() {
        this.state = VpSidebarComponent.STATE_EXPANDED;
    }


    compact() {
        this.state = VpSidebarComponent.STATE_COMPACTED;
    }


    toggle(compact: boolean = false) {
        if (this.responsiveEnabled()) {
            if (this.responsiveState === VpSidebarComponent.RESPONSIVE_STATE_MOBILE) {
                compact = false;
            }
        }

        const closedStates = [VpSidebarComponent.STATE_COMPACTED, VpSidebarComponent.STATE_COLLAPSED];
        if (compact) {
            this.state = closedStates.includes(this.stateValue) ?
                VpSidebarComponent.STATE_EXPANDED : VpSidebarComponent.STATE_COMPACTED;
        } else {
            this.state = closedStates.includes(this.stateValue) ?
                VpSidebarComponent.STATE_EXPANDED : VpSidebarComponent.STATE_COLLAPSED;
        }
    }

    protected onMediaQueryChanges(): Subscription {
        return this.themeService.onMediaQueryChange()
            .subscribe(([prev, current]: [MediaBreakpoint, MediaBreakpoint]) => {

                const isCollapsed = this.collapsedBreakpoints.includes(current.name);
                const isCompacted = this.compactedBreakpoints.includes(current.name);

                if (isCompacted) {
                    this.fixed = this.containerFixedValue;
                    this.compact();
                    this.responsiveState = VpSidebarComponent.RESPONSIVE_STATE_TABLET;
                }
                if (isCollapsed) {
                    this.fixed = true;
                    this.collapse();
                    this.responsiveState = VpSidebarComponent.RESPONSIVE_STATE_MOBILE;
                }
                if (!isCollapsed && !isCompacted && prev.width < current.width) {
                    this.expand();
                    this.fixed = false;
                    this.responsiveState = VpSidebarComponent.RESPONSIVE_STATE_PC;
                }
            });
    }

    protected responsiveEnabled(): boolean {
        return this.responsiveValue;
    }
}
