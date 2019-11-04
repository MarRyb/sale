import * as tslib_1 from "tslib";
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CurrentUserService } from './../core/services/current-user.service';
let ShowAuthedDirective = class ShowAuthedDirective {
    constructor(templateRef, currentUserService, viewContainer) {
        this.templateRef = templateRef;
        this.currentUserService = currentUserService;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        this.currentUserService.isAuthenticated.subscribe((isAuthenticated) => {
            if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
            else {
                this.viewContainer.clear();
            }
        });
    }
    set appShowAuthed(condition) {
        this.condition = condition;
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], ShowAuthedDirective.prototype, "appShowAuthed", null);
ShowAuthedDirective = tslib_1.__decorate([
    Directive({ selector: '[appShowAuthed]' }),
    tslib_1.__metadata("design:paramtypes", [TemplateRef,
        CurrentUserService,
        ViewContainerRef])
], ShowAuthedDirective);
export { ShowAuthedDirective };
//# sourceMappingURL=show-authed.directive.js.map