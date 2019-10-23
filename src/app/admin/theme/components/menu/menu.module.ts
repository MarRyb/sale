import { NgModule, ModuleWithProviders } from '@angular/core';
import { VpMenuComponent, MenuItemComponent } from './menu.component';
import { VpMenuService, MenuInternalService } from './menu.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const MenuComponents = [VpMenuComponent, MenuItemComponent];

const MENU_PROVIDERS = [VpMenuService, MenuInternalService];

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ...MenuComponents
    ],
    exports: [
        ...MenuComponents
    ],
})
export class MenuModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MenuModule,
            providers: [
                ...MENU_PROVIDERS,
            ],
        } as ModuleWithProviders;
    }
}
