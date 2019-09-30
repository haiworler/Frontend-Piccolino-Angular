import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any;
  public user: BehaviorSubject<any>;
  private currentUser: Observable<any>;

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.user.asObservable();
  }

  get currentUserValue(): any {
    return this.user.value;
  }

  /**
   * Realiza la consulta al servidor para validar que el usuario y contraseña sean los correctos
   */

  login = (name: string, password: string) => {
    return this.http.post(`${environment.UrlApi}/auth/login`, { name: name, password: password }).pipe(map((response: any) => {
      if (response && response.token) {
         localStorage.setItem('token', response.token);
         localStorage.setItem('user', JSON.stringify(response.user));
        this.user.next(response.user);
        return response;
      }
    }));
  };

  isAuthenticated = () => !!this.currentUserValue;

  logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user.next(null);
    this.router.navigate(['/auth/login']);
  };

}