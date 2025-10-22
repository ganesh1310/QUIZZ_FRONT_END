import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoSpecialCharacterDirective]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoSpecialCharacterDirective, multi: true }]
})
export class NoSpecialCharacterDirective implements Validator { 
   validate(control: AbstractControl): ValidationErrors | null {
    const forbiddenChars = /[!@#$%^&*(),.?":{}|<>]/g;
    const hasSpecialChars = forbiddenChars.test(control.value);
    return hasSpecialChars ? { specialCharacterNotAllowed : true } : null;
  }

}
