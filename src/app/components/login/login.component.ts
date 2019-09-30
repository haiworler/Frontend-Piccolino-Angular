import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FORM_REGEX } from 'src/app/regex/formRegex';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public reactiveForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    console.log('Ingreso al login component');
  }

  ngOnInit() {
    this.reactiveForm = this.defineReactiveForm();
  }

  private defineReactiveForm(): FormGroup {
    return this.formBuilder.group(
      {
        'username': ['', [Validators.required /**, Validators.pattern(`${FORM_REGEX.email}`)*/]],
        'password': ['', [Validators.required]]
      }
    )
  }

  /**
   * @description Tiene como objetivo manejar la logica de cuando se da click/tap en el botón de Iniciar sesión
   * @author Luis Eduardo Garizabalo Acosta
   * @param void
   * @returns void
   */
  public handleLogin(): void {
    const username = this.reactiveForm.get('username').value;
    const password = this.reactiveForm.get('password').value;
    this._authService.login(username, password).pipe(first()).subscribe((response: any) => {
      console.log('Respuesta', response);
      this.router.navigate(['deshboard']);
      console.log('No hace nada');
    }, error => console.log("Error Lucho: ", error));
  }

}
