import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from '../app-services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router,
    private _storageService: StorageService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jsonFilter = request.url.search('.json');

    if (jsonFilter === -1) {
      console.log('Ingreso al interceptor Jwt');
      let token = localStorage.getItem('token');
      let module = this.router.url;

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Module: module
          }
        });
      }
      return next.handle(request).pipe(tap((response: HttpEvent<any>) => {
        if (response instanceof HttpResponse) {
          if (response.headers.get('authorization')) {
            token = response.headers.get('authorization').split(' ')[1];
            this._storageService.setItem('token', token);
            localStorage.setItem('token', token);

            if (module !== '/auth/login') {
                this._storageService.setItem('token', token);
            } else {
              localStorage.setItem('token', token);
            }
            return next.handle(request);
          }
        }
      }));
    } else {
      return next.handle(request);
    }
  }
}