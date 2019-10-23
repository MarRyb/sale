import { Component, OnInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ThemeService } from './admin/theme/service/theme.service';
import { takeWhile, filter } from 'rxjs/operators';
import { MediaBreakpoint } from './admin/theme/service/breakpoints.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isShowElemToAuth = false;
    arrayUrl: [];
    isShowAdmin: boolean = false;
    private alive: boolean = true;
    breakpoint: MediaBreakpoint;

    constructor(private currentUser: CurrentUserService,
        // tslint:disable:align
        @Inject(WINDOW) private window: Window,
        @Inject(PLATFORM_ID) private platformId: {},
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private themeService: ThemeService) {
        if (isPlatformBrowser(this.platformId)) {
            this.currentUser.authenticate();
        }
        // route.events.subscribe(event => {
        //   if (event instanceof NavigationStart) {
        //     const arrayUrl = ['/signin', '/registration', '/forgot-password', '/update-password', '/forgot-email/verify', '/vp-admin'];
        //     this.isShowElemToAuth = true;
        //     if (arrayUrl.includes(event.url)) {
        //       this.isShowElemToAuth = false;
        //     }
        //   }
        // });
    }
    title = 'kash';

    ngOnInit() {
        this.routeState();
        this.themeService.onMediaQueryChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe(([oldValue, newValue]) => {
                this.breakpoint = newValue;
            });
    }

    onActivate() {
        if (isPlatformBrowser(this.platformId)) {
            this.window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: UIEvent) {
        this.themeService.changeWindowWidth((event.target as Window).innerWidth);
    }

    routeState() {
        this.router.events.pipe(
            takeWhile(() => this.alive),
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.isShowElemToAuth = this.activatedRoute.firstChild.snapshot.data.showElemToAuth !== false;
            this.isShowAdmin = this.activatedRoute.firstChild.snapshot.data.showAdmin === true;
        });
    }

}
