import { AbstractControl, ValidationErrors } from "@angular/forms";

export function noSpecialCharsValidator(control: AbstractControl): ValidationErrors | null {
  const forbiddenChars = /[!@#$%^&*(),.?":{}|<>]/g;
  const hasSpecialChars = forbiddenChars.test(control.value);
  return hasSpecialChars ? { 'noSpecialChars': { value: control.value } } : null;
}
