import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FORM_REGEX } from 'src/app/regex/formRegex';

@Injectable({
    providedIn: 'root'
})

export class ValidatorsFormService {

    public errorKeys = ['required', 'email', 'minlength', 'pattern'];
    public possibleErrors: any = {};

    constructor() {
        this.possibleErrors = this.definePossibleErrors();
    }

    /**
     * Tiene como objetivo verificar si dado un control de algún formulario este tiene un error,
     * es decir que dicho control no esta cumpliendo con alguna validacion establecida
     * @author Luis Eduardo Garizabalo Acosta
     * @param controlName el nombre asociado al control que se quiere evaluar
     * @param reactiveForm el formulario reactivo del cual se esta haciendo referencia
     * @returns retorna true si se ha encontrado que el control incumple alguna regla impuesta, false si no.
     */
    public hasErrorControl(controlName: string, reactiveForm: AbstractControl): Boolean {
        return reactiveForm.get(controlName).invalid;
    }

    /**
     * Tiene como objetivo obtener un mensaje de error explicando que regla del control se esta incumpliendo
     * @author Luis Eduardo Garizabalo Acosta
     * @param controlName el nombre asociado al control que se quiere extraer el mensaje de error
     * @param reactiveForm el formulario reactivo del cual se esta haciendo referencia
     * @returns String con el mensaje de error generado por una regla no cumplida
     */
    public getErrorControl(controlName: string, reactiveForm: AbstractControl): String {
        const control: AbstractControl = reactiveForm.get(controlName);
        let messageError = '';
        for (const error in control.errors) {
            if (this.errorKeys.includes(error)) {
                if (typeof this.possibleErrors[error] === 'function') {
                    messageError = this.possibleErrors[error](control);
                } else {
                    messageError = this.possibleErrors[error];
                }
            } else {
                messageError = 'Desconocido';
            }
        }
        return messageError;
    }

    /**
     * Tiene como objetivo definir los campos con los posibles errores y sus mensajes de feedback
     * @author Luis Eduardo Garizabalo Acosta
     * @returns retorna un objeto con los campos de los posibles errores y sus mensajes de feedback
     */
    private definePossibleErrors(): any {
        const possibleErrors = {
            'required': 'El campo es obligatorio',
            'email': 'Email invalido',
            'minlength': this.defineErrorMessageForMinLength(),
            'pattern': this.defineErrorMessageForPattern(),
            'mustMatch': 'Las contraseñas no coinciden'
        };
        return possibleErrors;
    }

    /**
     * Tiene como objetivo definir el mensaje de error para los errores de tipo "minlength"
     * @author Luis Eduardo Garizabalo Acosta
     * @returns Retorna una función, la cual resuelve el mensaje de error
     */
    private defineErrorMessageForMinLength(): (control: AbstractControl) => string {
        return (control: AbstractControl) => {
            const requiredLength = control.getError('minlength').requiredLength;
            return `Este campo debe tener al menos ${requiredLength} caracteres`;
        };
    }

    /**
    * Tiene como objetivo definir el mensaje de error para los errores de tipo "pattern"
    * @author Luis Eduardo Garizabalo Acosta
    * @returns Retorna una función, la cual resuelve el mensaje de error
    */
    private defineErrorMessageForPattern(): (control: AbstractControl) => string {
        return (control: AbstractControl) => {
            const { requiredPattern } = control.getError('pattern');
            let messageError = '';
            switch (requiredPattern) {
                case FORM_REGEX.CC:
                    messageError = `Número de documento invalido`;
                    break;
                case FORM_REGEX.number:
                    messageError = `El campo debe ser númerico`;
                    break;
                case FORM_REGEX.licensePlate:
                    messageError = `Placa invalida`;
                    break;
                case FORM_REGEX.textWithSpaces:
                    messageError = `Texto invalido`;
                    break;
                case FORM_REGEX.email:
                    messageError = `Email invalido`;
                    break;
                case FORM_REGEX.cellPhone:
                    messageError = `Celular invalido`;
                    break;
                case FORM_REGEX.year:
                    messageError = `Año invalido`;
                    break;
                case FORM_REGEX.oneWord:
                    messageError = `Este campo solo permite una palablra (sin espacios)`;
                    break;
                default: messageError = `Campo invalido`;
            }
            return messageError;
        };
    }

}

