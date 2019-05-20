import { Component, OnInit } from '@angular/core';
import { User } from './model/user';
import {LoginService} from './service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public mensaje: string;
  public formLogin: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _loginService: LoginService
  ) {
    this.formLogin = _formBuilder.group({
      name: ['',Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])[a-zA-Z0-9]+$'),
        Validators.maxLength(20)
      ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.maxLength(20)
      ])]
    })
  }

  ngOnInit() {
    this.mensaje = localStorage.getItem('error');
    localStorage.removeItem('nickname');
  }

  getLogin(user: User){
    console.log(user);

    localStorage.setItem('nickname',user.name);
    this._loginService.autenticacion(user).subscribe(
      
      (response) => {
        console.log(response);
        this._router.navigate(['']);
      },
      (error) => {
        this.mensaje = error.error.message;
      }
    )
  }

  validar(data: any){
    console.log(data)
    if(data.status == 200){
      this._router.navigate(['home']);
    }
    else{
      console.log(data.error);
      this.mensaje =  data.error.message;
    }
  }

  error(data:any){
    console.log(data);
  }

}
