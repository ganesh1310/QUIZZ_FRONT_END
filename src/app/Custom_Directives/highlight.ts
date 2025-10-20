import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  constructor(private ele : ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.ele.nativeElement.style.color  = 'red';  
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.ele.nativeElement.style.color  = '';
  }

}
