import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') toogle:boolean= false;
  constructor(private elRef :ElementRef) {

  }
  @HostListener('document:click',['$event']) onClick(event:Event) {
    this.toogle = this.elRef.nativeElement.contains(event.target) ? !this.toogle : false;
  }
}
