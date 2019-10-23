import { Inject, Injectable } from '@angular/core';
import { VP_MEDIA_BREAKPOINTS } from '../theme.options';


export interface MediaBreakpoint {
    name: string;
    width: number;
}

export const DEFAULT_MEDIA_BREAKPOINTS = [
    {
        name: 'xs',
        width: 0,
    },
    {
        name: 'is',
        width: 414,
    },
    {
        name: 'sm',
        width: 576,
    },
    {
        name: 'md',
        width: 768,
    },
    {
        name: 'lg',
        width: 992,
    },
    {
        name: 'xl',
        width: 1200,
    },
    {
        name: 'xxl',
        width: 1400,
    },
    {
        name: 'xxxl',
        width: 1600,
    },
];


@Injectable({
    providedIn: 'root'
})
export class MediaBreakpointsService {

    private breakpointsMap: { [breakpoint: string]: number };

    constructor(@Inject(VP_MEDIA_BREAKPOINTS) private breakpoints) {
        this.breakpointsMap = this.breakpoints.reduce((res, b: MediaBreakpoint) => {
            res[b.name] = b.width;
            return res;
        }, {});
    }

    getByWidth(width: number): MediaBreakpoint {
        // tslint:disable-next-line:object-literal-shorthand
        const unknown = { name: 'unknown', width: width };
        const breakpoints = this.getBreakpoints();

        return breakpoints
            .find((point: MediaBreakpoint, index: number) => {
                const next = breakpoints[index + 1];
                return width >= point.width && (!next || width < next.width);
            }) || unknown;
    }


    getByName(name: string): MediaBreakpoint {
        const unknown = { name: 'unknown', width: NaN };
        const breakpoints = this.getBreakpoints();

        return breakpoints.find((point: MediaBreakpoint) => name === point.name) || unknown;
    }


    getBreakpoints(): MediaBreakpoint[] {
        return this.breakpoints;
    }


    getBreakpointsMap(): { [breakpoint: string]: number } {
        return this.breakpointsMap;
    }
}
