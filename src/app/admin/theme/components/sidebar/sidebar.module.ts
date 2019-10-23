import { NgModule, ModuleWithProviders } from '@angular/core';

import {
    VpSidebarComponent,
    VpSidebarFooterComponent,
    VpSidebarHeaderComponent,
} from './sidebar.component';

import { VpSidebarService } from './sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const VP_SIDEBAR_COMPONENTS = [
    VpSidebarComponent,
    VpSidebarFooterComponent,
    VpSidebarHeaderComponent,
];

const VP_SIDEBAR_PROVIDERS = [
    VpSidebarService,
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        ...VP_SIDEBAR_COMPONENTS,
    ],
    exports: [
        ...VP_SIDEBAR_COMPONENTS,
    ],
})
export class VpSidebarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: VpSidebarModule,
            providers: [
                ...VP_SIDEBAR_PROVIDERS,
            ],
        } as ModuleWithProviders;
    }
}
