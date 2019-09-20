import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { WINDOW } from '@ng-toolkit/universal';
@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
    constructor(@Inject(WINDOW) private window: Window, 
        private router: Router
    ) { }

    goToMain() {
        this.window.scrollTo(0, 0);
        setTimeout(() => {
            return this.router.navigate(['']);
        }, 100);
    }

}
