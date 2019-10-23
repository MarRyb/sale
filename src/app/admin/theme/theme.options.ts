
import { InjectionToken } from '@angular/core';
import { MediaBreakpoint } from './service/breakpoints.service';

export const VP_MEDIA_BREAKPOINTS = new InjectionToken<MediaBreakpoint[]>('Vpotoke Media Breakpoints');

export const VP_WINDOW = new InjectionToken<Window>('Window');
export const VP_DOCUMENT = new InjectionToken<Document>('Document');
