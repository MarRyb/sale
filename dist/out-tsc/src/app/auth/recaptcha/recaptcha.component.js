import * as tslib_1 from "tslib";
import { NgControl, } from '@angular/forms';
import { Inject, Output, EventEmitter, Component, ViewChild, ElementRef, Self, Optional, NgZone, ChangeDetectorRef, Injectable, ChangeDetectionStrategy, } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';
let ScriptLoaderService = class ScriptLoaderService {
    injectAndLoadScript(config) {
        const script = document.createElement('script');
        script.src = config.scriptSrc;
        script.async = true;
        script.defer = true;
        script.onload = () => config.onLoadCallback();
        script.onerror = err => config.onErrorCallback(err);
        document.body.appendChild(script);
    }
};
ScriptLoaderService = tslib_1.__decorate([
    Injectable()
], ScriptLoaderService);
export { ScriptLoaderService };
let RecaptchaComponent = class RecaptchaComponent {
    constructor(
    // @Inject(RECAPTCHA_CONFIG) private recaptchaConfig: RecaptchaModuleConfig,
    recaptchaConfig, controlDir, scriptLoaderService, zone, cd, window) {
        this.recaptchaConfig = recaptchaConfig;
        this.controlDir = controlDir;
        this.scriptLoaderService = scriptLoaderService;
        this.zone = zone;
        this.cd = cd;
        this.window = window;
        this.scriptLoad = new EventEmitter();
        this.scriptError = new EventEmitter();
        this.GLOBAL_ON_LOAD_CALLBACK_NAME = '___recaptchaOnLoadCallback___';
        this.controlDir.valueAccessor = this;
    }
    ngOnInit() {
        const control = this.controlDir.control;
        if (!control) {
            return;
        }
        this.setGlobalHandlers();
        this.injectGoogleRecaptchaScript();
        /**
         * Only one validator (specifically our one below) makes sense for this Control, so we just overwrite
         * whatever was previously set
         */
        control.setValidators((ctrl) => {
            if (typeof this.activeRecaptchaId === 'undefined' || !this.recaptchaAPI) {
                return {
                    invalidRecaptcha: true,
                };
            }
            const recaptchaResponse = this.recaptchaAPI.getResponse(this.activeRecaptchaId);
            if (!recaptchaResponse) {
                return {
                    invalidRecaptcha: true,
                };
            }
            return null;
        });
        control.updateValueAndValidity();
    }
    ngOnDestroy() {
        this.unsetGlobalHandlers();
    }
    /**
     * There is currently no way to programmatically set the value of
     * a visible reCAPTCHA, so this is a noop
     */
    writeValue(val) { }
    /**
     * Required method of the ControlValueAccessor interface, we register the callback
     * function that should be called whenever the model value changes
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Required method of the ControlValueAccessor interface, we register the callback
     * function that should be called whenever the control is "touched"
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Unfortunately we have to register a global handler for the onload
     * event from the recaptcha lib
     */
    setGlobalHandlers() {
        this.window[this.GLOBAL_ON_LOAD_CALLBACK_NAME] = () => {
            /**
             * Make it easier to add type information to, and work with, the recaptcha lib
             * by storing a single reference to it
             */
            this.recaptchaAPI = this.window.grecaptcha;
            this.renderRecaptcha();
        };
    }
    unsetGlobalHandlers() {
        delete this.window[this.GLOBAL_ON_LOAD_CALLBACK_NAME];
    }
    /**
     * Create a <script> element and inject it into the page in order
     * to load the recaptcha lib. Emit load or error events from the relevant
     * Outputs to the component
     */
    injectGoogleRecaptchaScript() {
        this.scriptLoaderService.injectAndLoadScript({
            scriptSrc: `https://www.google.com/recaptcha/api.js?render=explicit&onload=${this.GLOBAL_ON_LOAD_CALLBACK_NAME}`,
            onLoadCallback: () => this.scriptLoad.emit(),
            onErrorCallback: err => this.scriptError.emit(err),
        });
    }
    /**
     * Use the recaptcha lib to manually render a recaptcha widget with the ViewChild
     * container element, passing the relevant callbacks and configuration options
     */
    renderRecaptcha() {
        if (!this.recaptchaAPI) {
            return;
        }
        this.activeRecaptchaId = this.recaptchaAPI.render(this.container.nativeElement, {
            sitekey: this.recaptchaConfig.siteKey,
            callback: this.onRecaptchaValidCallback.bind(this),
            'expired-callback': this.onRecaptchaExpiredCallback.bind(this),
        });
    }
    /**
     * Handler which will be registered with the recaptcha lib to be called
     * whenever it has a valid status
     */
    onRecaptchaValidCallback() {
        this.zone.run(() => {
            this.onChange(true);
            this.onTouched();
            this.cd.markForCheck();
        });
    }
    /**
     * Handler which will be registered with the recaptcha lib to be called
     * whenever its valid status expires
     */
    onRecaptchaExpiredCallback() {
        this.zone.run(() => {
            this.onChange(false);
            this.cd.markForCheck();
        });
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], RecaptchaComponent.prototype, "scriptLoad", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], RecaptchaComponent.prototype, "scriptError", void 0);
tslib_1.__decorate([
    ViewChild('container', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], RecaptchaComponent.prototype, "container", void 0);
RecaptchaComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line: component-selector
        selector: 'recaptcha',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `<div class="google-recaptcha-container" #container></div>`,
        providers: [ScriptLoaderService],
    }),
    tslib_1.__param(0, Inject('google-recaptcha siteKey')),
    tslib_1.__param(1, Self()),
    tslib_1.__param(1, Optional()),
    tslib_1.__param(5, Inject(WINDOW)),
    tslib_1.__metadata("design:paramtypes", [Object, NgControl,
        ScriptLoaderService,
        NgZone,
        ChangeDetectorRef,
        Window])
], RecaptchaComponent);
export { RecaptchaComponent };
//# sourceMappingURL=recaptcha.component.js.map