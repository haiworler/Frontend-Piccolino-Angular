import { ErrorMessage } from 'ng-bootstrap-form-validation';

export const CUSTOM_ERRORS: ErrorMessage[] = [
	{ error: 'required', format: requiredFormat },
	{ error: 'email', format: emailFormat },
	{ error: 'min', format: minFormat },
	{ error: 'max', format: maxFormat },
	{ error: 'minlength', format: minLengthFormat },
	{ error: 'maxlength', format: maxLengthFormat },
];

export function requiredFormat(label: string, error: any): string {
	return `${label} Campo obligatorio`;
}

export function emailFormat(label: string, error: any): string {
	return `${label} Formato no válido`;
}

export function minFormat(label: string, error: any): string {
	return `${label} El valor debe ser mayor o igual a ${error.min}`;
}

export function maxFormat(label: string, error: any): string {
	return `${label} El valor debe ser menor o igual a ${error.max}`;
}

export function minLengthFormat(label: string, error: any): string {
	return `${label} Debe tener al menos ${error.requiredLength} caracteres`;
}

export function maxLengthFormat(label: string, error: any): string {
	return `${label} No debe superar los ${error.requiredLength} caracteres`;
}
