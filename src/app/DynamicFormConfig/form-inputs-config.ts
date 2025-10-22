import { ValidatorFn } from "@angular/forms";

export interface FormInputsConfig {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: any;
  validators?: ValidatorFn[];
}
