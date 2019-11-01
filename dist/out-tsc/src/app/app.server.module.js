import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
let AppServerModule = class AppServerModule {
};
AppServerModule = tslib_1.__decorate([
    NgModule({
        imports: [
            AppModule,
            ServerModule,
            ModuleMapLoaderModule,
            ServerTransferStateModule,
        ],
        bootstrap: [AppComponent],
    })
], AppServerModule);
export { AppServerModule };
//# sourceMappingURL=app.server.module.js.map