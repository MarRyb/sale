import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class VpSidebarService {

    private toggle$ = new Subject<{ compact: boolean, tag: string }>();
    private expand$ = new Subject<{ tag: string }>();
    private collapse$ = new Subject<{ tag: string }>();


    onToggle(): Observable<{ compact: boolean, tag: string }> {
        return this.toggle$.pipe(share());
    }


    onExpand(): Observable<{ tag: string }> {
        return this.expand$.pipe(share());
    }


    onCollapse(): Observable<{ tag: string }> {
        return this.collapse$.pipe(share());
    }


    toggle(compact: boolean = false, tag?: string) {
        this.toggle$.next({ compact, tag });
    }


    expand(tag?: string) {
        this.expand$.next({ tag });
    }


    collapse(tag?: string) {
        this.collapse$.next({ tag });
    }

}
