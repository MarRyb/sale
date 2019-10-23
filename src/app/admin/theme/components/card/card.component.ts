import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card-header',
  template: `<ng-content></ng-content>`,
})
export class VpCardHeaderComponent {
}

/**
 * Component intended to be used within  the `<app-card>` component.
 */
@Component({
  selector: 'app-card-body',
  template: `<ng-content></ng-content>`,
})
export class VpCardBodyComponent {
}

/**
 * Component intended to be used within  the `<app-card>` component.
 */
@Component({
  selector: 'app-card-footer',
  template: `<ng-content></ng-content>`,
})
export class VpCardFooterComponent {
}

/**
 *
 * Basic card configuration:
 *
 * ```html
 * <app-card>
 *   <app-card-body>
 *     Card
 *   </app-card-body>
 * </app-card>
 * ```
 *
 * ### Installation
 *
 * Import `VpCardModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     VpCardModule,
 *   ],
 * })
 **/

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <ng-content select="app-card-header"></ng-content>
    <ng-content select="app-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="app-card-footer"></ng-content>
  `,
})
export class VpCardComponent {

  static readonly SIZE_XXSMALL = 'xxsmall';
  static readonly SIZE_XSMALL = 'xsmall';
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';
  static readonly SIZE_XXLARGE = 'xxlarge';

  static readonly STATUS_ACTIVE = 'active';
  static readonly STATUS_DISABLED = 'disabled';
  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  static readonly ACCENT_ACTIVE = 'active';
  static readonly ACCENT_DISABLED = 'disabled';
  static readonly ACCENT_PRIMARY = 'primary';
  static readonly ACCENT_INFO = 'info';
  static readonly ACCENT_SUCCESS = 'success';
  static readonly ACCENT_WARNING = 'warning';
  static readonly ACCENT_DANGER = 'danger';

  size: string;
  status: string;
  accent: string;

  @HostBinding('class.xxsmall-card')
  get xxsmall() {
    return this.size === VpCardComponent.SIZE_XXSMALL;
  }

  @HostBinding('class.xsmall-card')
  get xsmall() {
    return this.size === VpCardComponent.SIZE_XSMALL;
  }

  @HostBinding('class.small-card')
  get small() {
    return this.size === VpCardComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium-card')
  get medium() {
    return this.size === VpCardComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large-card')
  get large() {
    return this.size === VpCardComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge-card')
  get xlarge() {
    return this.size === VpCardComponent.SIZE_XLARGE;
  }

  @HostBinding('class.xxlarge-card')
  get xxlarge() {
    return this.size === VpCardComponent.SIZE_XXLARGE;
  }

  @HostBinding('class.active-card')
  get active() {
    return this.status === VpCardComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-card')
  get disabled() {
    return this.status === VpCardComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-card')
  get primary() {
    return this.status === VpCardComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-card')
  get info() {
    return this.status === VpCardComponent.STATUS_INFO;
  }

  @HostBinding('class.success-card')
  get success() {
    return this.status === VpCardComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-card')
  get warning() {
    return this.status === VpCardComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-card')
  get danger() {
    return this.status === VpCardComponent.STATUS_DANGER;
  }

  @HostBinding('class.accent')
  get hasAccent() {
    return this.accent;
  }

  @HostBinding('class.accent-primary')
  get primaryAccent() {
    return this.accent === VpCardComponent.ACCENT_PRIMARY;
  }

  @HostBinding('class.accent-info')
  get infoAccent() {
    return this.accent === VpCardComponent.ACCENT_INFO;
  }

  @HostBinding('class.accent-success')
  get successAccent() {
    return this.accent === VpCardComponent.ACCENT_SUCCESS;
  }

  @HostBinding('class.accent-warning')
  get warningAccent() {
    return this.accent === VpCardComponent.ACCENT_WARNING;
  }

  @HostBinding('class.accent-danger')
  get dangerAccent() {
    return this.accent === VpCardComponent.ACCENT_DANGER;
  }

  @HostBinding('class.accent-active')
  get activeAccent() {
    return this.accent === VpCardComponent.ACCENT_ACTIVE;
  }

  @HostBinding('class.accent-disabled')
  get disabledAccent() {
    return this.accent === VpCardComponent.ACCENT_DISABLED;
  }

  /**
   * Card size, available sizes:
   * xxsmall, xsmall, small, medium, large, xlarge, xxlarge
   * @param {string} val
   */
  @Input('size')
  private set setSize(val: string) {
    this.size = val;
  }

  /**
   * Card status (adds specific styles):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('status')
  private set setStatus(val: string) {
    this.status = val;
  }

  /**
   * Card accent (color of the top border):
   * active, disabled, primary, info, success, warning, danger
   * @param {string} val
   */
  @Input('accent')
  private set setAccent(val: string) {
    this.accent = val;
  }

}
