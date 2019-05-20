import { Injectable } from '@angular/core';
import { User } from './../model/user';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable} from '../../../../node_modules/rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL: string = 'http://localhost:3000/api/auth/login';
  private params = new HttpParams();
  constructor(private _http:HttpClient) { }

  public autenticacion(user:User): Observable<any>{
    return this._http.post(this.API_URL, user);
  }
}
