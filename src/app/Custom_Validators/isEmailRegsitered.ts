import { AbstractControl, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

export function isEmailRegistered(control: AbstractControl): Observable<ValidationErrors | null> {
  const fakeTakenEmails = ['gavhaneganesh1313@gmail.com' , 'bapugite4545@gmail.com'];
  return of(fakeTakenEmails.includes(control.value)).pipe(
    delay(1000), // simulate network delay
    map(isTaken => isTaken ? { emailTaken: true } : null)
  );
}
