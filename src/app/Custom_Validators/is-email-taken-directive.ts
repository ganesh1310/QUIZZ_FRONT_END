import { Directive } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { delay, map, of } from 'rxjs';

@Directive({
  selector: '[appIsEmailTakenDirective]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: IsEmailTakenDirective,
      multi: true
    }
  ]
})
export class IsEmailTakenDirective implements Validator {

  private takenEmails = ['gavhaneganesh1313@gmail.com' , 'bapugite4545@gmail.com'];

  validate(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return of(null);

    return of(this.takenEmails.includes(email)).pipe(
      delay(500), // simulate server delay
      map(isTaken => (isTaken ? { emailTaken: true } : null))
    );
  }

}
