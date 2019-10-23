import { FormGroup } from '@angular/forms';

/**
 *
validador personalizado para verificar que dos campos coincidan
 */
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }
        /**
				 * establecer error en MatchControl si falla la validación
				 */
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
