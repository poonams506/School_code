import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appPercentageDirective]'
})
export class PercentageDirective {
  // private regex: RegExp = new RegExp(/^[+-]?\d*\.?\d{0,2}$|^999/g);
  private regex: RegExp = new RegExp(/(^999([.]0{0,2})?)$|(^\d{0,3}([.]\d{0,2})?)$/);
  // private regex: RegExp = new RegExp(/^[1-9]?[0-9]{1}$|^100$/g);
  // private regex: RegExp = new RegExp(/^[+-]?\d*\.?\d{0,2}?|100$/g);
  // private regex: RegExp = new RegExp(/^(\d{0,2}(\.\d{1,2})?|100(\.00?)?)$/g);
  // private regex: RegExp = new RegExp(/^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$/g);
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
