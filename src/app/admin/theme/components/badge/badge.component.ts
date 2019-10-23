import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-badge',
    styleUrls: ['./badge.component.scss'],
    template: `
    <span *ngIf="image" class="v-badge {{positionClass}} v-badge-image"><img [src]="image"></span>
    <span *ngIf="text" class="v-badge {{positionClass}} v-badge-{{colorClass}}">{{text}}</span>
  `,
})
export class BadgeComponent {
    static readonly TOP_LEFT = 'top left';
    static readonly TOP_RIGHT = 'top right';
    static readonly BOTTOM_LEFT = 'bottom left';
    static readonly BOTTOM_RIGHT = 'bottom right';

    static readonly TOP_START = 'top start';
    static readonly TOP_END = 'top end';
    static readonly BOTTOM_START = 'bottom start';
    static readonly BOTTOM_END = 'bottom end';

    static readonly STATUS_PRIMARY = 'primary';
    static readonly STATUS_INFO = 'info';
    static readonly STATUS_SUCCESS = 'success';
    static readonly STATUS_WARNING = 'warning';
    static readonly STATUS_DANGER = 'danger';

    colorClass: string = BadgeComponent.STATUS_PRIMARY;

    @Input() text = '';

    @Input() position: string;

    @Input() image: string;

    @Input() set status(value: string) {
        if (value) {
            this.colorClass = value;
        }
    }

    get positionClass() {
        if (!this.position) {
            return BadgeComponent.TOP_RIGHT;
        }

        const startValue = 'left';
        const endValue = 'right';
        return this.position
            .replace(/\bstart\b/, startValue)
            .replace(/\bend\b/, endValue);
    }

    constructor() { }
}
