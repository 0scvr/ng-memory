import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[memoMinFlipCount]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MinFlipCountDirective,
    multi: true
  }]
})
export class MinFlipCountDirective implements Validator {
  @Input('memoMinFlipCount') minValue: number;

  validate(control: AbstractControl): ValidationErrors {
    if (this.minValue && control.value < this.minValue) {
      return { 'maxFlipCountInvalid': true };
    }
    return null;
  }
}
