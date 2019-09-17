import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
@Directive({ selector: '[appClickOutside]' })

export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) {}

  @Output()
  public appClickOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit(null);
    }
  }
}
