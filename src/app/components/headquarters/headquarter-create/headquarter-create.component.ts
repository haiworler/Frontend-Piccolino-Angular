import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { HeadquarterService } from '../../../services/app-services/headquarter.service';
import { FORM_REGEX } from 'src/app/regex/formRegex';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ValidatorsFormService } from 'src/app/services/forms/validators-form.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-headquarter-create',
  templateUrl: './headquarter-create.component.html',
  styles: []
})
export class HeadquarterCreateComponent implements OnInit, OnDestroy {
  public reactiveForm: FormGroup;
  public isLinear: boolean = true;
  arrayNeighborhood: any[];

  constructor(
    private formBuilder: FormBuilder,
    private _headquarterService: HeadquarterService,
    private utilsService: UtilsService,
    public validatorsFormService: ValidatorsFormService,
  ) { }


  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
    this.arrayNeighborhood = [
      { id: 1, name: 'Lisboa' },
      { id: 2, name: 'San francisco' },
      { id: 3, name: 'Salle' }
    ];
  }

  /**
  * Tiene como objetivo indicar los campos requeridos y el formato que deben llevar.
  * @author Luis Eduardo Garizabalo Acosta
  */

  private defineReactiveForm(): FormGroup {
    const reactiveForm = this.formBuilder.group({
      'name': ['', [Validators.required]],
      'arrayNeighborhood': [[], [Validators.required]],
      'state': [1, [Validators.required]],
      'observation': ['', [Validators.required]],
      'createAt': ['', [Validators.required]]
    });
    return reactiveForm;
  }


  /**
   * Tiene como objetivo indicar si determinado control tiene algún error que se deba retroalimentar
   * @author Luis Eduardo Garizabalo Acosta
   * @param controlName el control al cual se debe obtener el mensaje de error
   * @returns True si hay un error que se deba mostrar desde la UI, false si no
   */

  public hasErrorControl(controlName: string): Boolean {
    return this.validatorsFormService.hasErrorControl(controlName, this.reactiveForm);
  }

  /**
   * Tiene como objetivo obtener el error generado de un control determinado
   * @author Luis Eduardo Garizabalo Acosta
   * @param controlName String con el nombre del control del cual se quiere obtener el mensaje de error
   * @returns String con el mensaje de error generado
   */

  public getErrorMessage(controlName: string): String {
    return this.validatorsFormService.getErrorControl(controlName, this.reactiveForm);
  }


  /**
* @description Tiene como objetivo manejar la logica que involucra realizar click  en el botón de aceptar documento.
* @author Luis Eduardo Garizabalo Acosta
* @returns void
*/

  /**
   * @description Tiene como objetivo manejar la logica que involucra realizar click  en el botón de registro de la Oferta.
   * @author Luis Eduardo Garizabalo Acosta
   * @returns void
   */

  public create(): void {
    Swal.fire({
      title: '¿ Esta seguro(a) ?',
      text: "¿ Realmente desea registrar la sede ?",
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar'
    }).then((result) => {
      if (result.value) {
        //let data = this.reactiveForm;
        const data = {
          name: this.reactiveForm.value.name,
          neighborhoodId: this.reactiveForm.value.arrayNeighborhood,
          state: this.reactiveForm.value.state,
          observation: this.reactiveForm.value.observation,
          createAt: "2019/05/11"
        }
        console.log('Data qie registra: ', data);
        this._headquarterService.create(data).subscribe((response: any) => {
          Swal.fire({
            title: 'Proceso Exitoso',
            text: 'Se ha guardado la Sede',
            type: 'success'
          });
        });

      }
    });
  }

  /**
   * Tiene como objetivo la destruccion del componente
   */

  ngOnDestroy() {
  }

}



