import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map, filter, pairwise, distinctUntilChanged, startWith, share } from 'rxjs/operators';

import { MediaBreakpointsService, MediaBreakpoint } from './breakpoints.service';


@Injectable({
    providedIn: 'root'
})
export class ThemeService {


    private changeWindowWidth$ = new ReplaySubject<number>(2);

    constructor(private breakpointService: MediaBreakpointsService) {
    }


    changeWindowWidth(width: number): void {
        this.changeWindowWidth$.next(width);
    }

    onMediaQueryChange(): Observable<MediaBreakpoint[]> {
        return this.changeWindowWidth$
            .pipe(
                startWith(undefined),
                pairwise(),
                map(([prevWidth, width]: [number, number]) => {
                    return [
                        this.breakpointService.getByWidth(prevWidth),
                        this.breakpointService.getByWidth(width),
                    ];
                }),
                filter(([prevPoint, point]: [MediaBreakpoint, MediaBreakpoint]) => {
                    return prevPoint.name !== point.name;
                }),
                distinctUntilChanged(null, params => params[0].name + params[1].name),
                share(),
            );
    }

}
