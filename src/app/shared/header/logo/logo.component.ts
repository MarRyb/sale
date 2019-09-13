import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
    constructor(
        private router: Router
    ) { }

    goToMain() {
        window.scrollTo(0, 0);
        setTimeout(() => {
            return this.router.navigate(['']);
        }, 100);
    }

}
