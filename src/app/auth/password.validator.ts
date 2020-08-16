import { FormGroup } from '@angular/forms';

export function ValidatePassword(formGroup: FormGroup){
  if (formGroup.get('password').value !== formGroup.get('confirmPassword').value){
          return { notMatched: true };
        }
  return null;
}
