import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appPositiveNegativeNumberDirective]'
})
export class PositiveNegativeNumberDirective {
  private regex: RegExp = new RegExp(/(^-?9999([.]0{0,2})?)$|(^-?\d{0,4}([.]\d{0,2})?)$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
