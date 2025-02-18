import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appTwoDigitDecimalPositiveNumber]'
})
export class TwoDigitDecimalPositiveNumber {
  private regex: RegExp = new RegExp(/^[+]?\d*\.?\d{0,2}$/g);
  // private regex: RegExp = new RegExp(/^[1-9]?[0-9]{1}$|^100$/g);
  //private regex: RegExp = new RegExp(/^[+-]?[0-9]{1,9}(?:\.[0-9]{1,2})?$);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    //console.log(this.el.nativeElement.value);
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    if(parseFloat(current) < 0 || event.key == "."){
      current = '';
    }
    const position = this.el.nativeElement.selectionStart;
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
