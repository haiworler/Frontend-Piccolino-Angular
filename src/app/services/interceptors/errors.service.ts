import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { AuthService } from '../auth/auth.service';
// import { ToastrService } from 'ngx-toastr';
// import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router,
    // private _authService: AuthService, 
    // private toast: ToastrService,
    // private utilsService: UtilsService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      let messageError = '';
      console.log('Ingreso al interceptor del error',error.status);

      switch (error.status) {
        case 401:
          // this._authService.logout();
          // messageError = error.error.error;
          // this.toast.error(messageError, 'Error de autenticación');
          // this.router.navigate(['/auth/login']);
          break;

        case 400:
        case 422:
          // messageError = error.error.error.message;
          // this.toast.error(messageError, 'Error En La Transacción');
          break;

        case 500:
        //  this.toast.error('No hemos podido establecer comunicación con el servidor', 'Error En La Transacción');
          break;
        case 404:
         // this.router.navigate(['/unauthorized']);
          break;
        case 403: 
        //  this.toast.error('No tiene las autorizaciones suficientes para realizar esta acción', 'Error De Privilegios');
          break;
      }
      //this.utilsService.setIsLoading(false);
      return throwError(messageError);
    }));

  }

}