import * as tslib_1 from "tslib";
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
let ClickOutsideDirective = class ClickOutsideDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.appClickOutside = new EventEmitter();
    }
    onClick(targetElement) {
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.appClickOutside.emit(null);
        }
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], ClickOutsideDirective.prototype, "appClickOutside", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event.target']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ClickOutsideDirective.prototype, "onClick", null);
ClickOutsideDirective = tslib_1.__decorate([
    Directive({ selector: '[appClickOutside]' }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], ClickOutsideDirective);
export { ClickOutsideDirective };
//# sourceMappingURL=click-outside.directive.js.map