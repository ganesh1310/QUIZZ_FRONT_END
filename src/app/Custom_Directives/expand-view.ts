import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appExpandView]'
})
export class ExpandView {

  constructor(private ele: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    const element = this.ele.nativeElement;
    element.style.maxHeight = element.style.maxHeight ? null : '100px';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.ele.nativeElement.style.maxHeight = null;
  }
}
