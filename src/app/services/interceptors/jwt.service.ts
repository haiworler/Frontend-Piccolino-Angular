import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../app-services/storage.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

	constructor(
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

		// let token = localStorage.getItem('token');
		// let module = this.router.url;

		// if (token) {
		// 	request = request.clone({
		// 		setHeaders: {
		// 			Authorization: `Bearer ${token}`,
		// 			Module: module
		// 		}
		// 	});
		// }

		// return next.handle(request).pipe(tap((response: HttpEvent<any>) => {

		// 	if (response instanceof HttpResponse) {
		// 		if (response.headers.get('authorization')) {

		// 			token = response.headers.get('authorization').split(' ')[1];

		// 			/**
		// 			* ---------- IMPORTANTE ----------
		// 			*
		// 			* Es necesario establecer un control sobre el método setItem() del servicio StorageService,
		// 			* ya que el Observable debe inicializarse en todas las rutas a excepción de la ruta auth/login,
		// 			* de lo contrario se realizan múltiples suscripciones y el Observable no funciona correctamente.
		// 			*
		// 			* La situación que se presentaba era la siguiente:
		// 			*
		// 			* Se estaba suscribiendo 2 veces porque primero se ejecutaba la suscripción al iniciar sesión,
		// 			* y luego la del userData, por eso se disparaba 2 veces el Observable.
		// 			*
		// 			*/

		// 			if (module !== '/auth/login') {
		// 				this._storageService.setItem('token', token);
		// 			} else {
		// 				localStorage.setItem('token', token);
		// 			}

		// 			return next.handle(request);

		// 		}
		// 	}

		// }));

	}

}
