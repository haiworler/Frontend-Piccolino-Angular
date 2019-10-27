import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';

@Injectable({
	providedIn: 'root'
})
export class ErrorsInterceptor implements HttpInterceptor {

	constructor(
		private router: Router,
		private _authService: AuthService,
		private _modalService: ModalService,
		private _notificationsService: NotificationsService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(catchError(error => {

			switch (error.status) {

				case 401:
					this._modalService.reset();
					localStorage.removeItem('user');
					localStorage.removeItem('token');
					this.router.navigate(['/auth/login/']);
					this._notificationsService.error({
						title: 'Error',
						message: error.error.message || error.error.error
					});
					break;

				case 403:
					this._modalService.reset();
					this._notificationsService.error({
						title: 'Error',
						message: error.error.message
					});
					break;

				case 422:
					if (error.error.message instanceof Object) {
						Object.values(error.error.message).map((message: any) => {
							message.map((text: string) => {
								this._notificationsService.error({
									title: 'Error',
									message: text
								});
							});
						});
					} else {
						this._notificationsService.error({
							title: 'Error',
							message: error.error.message
						});
					}
					break;

				case 500:
					this._modalService.reset();
					this._notificationsService.error({
						title: 'Error',
						message: error.error.message
					});
					break;

			}

			return throwError(error.error);

		}));

	}

}
