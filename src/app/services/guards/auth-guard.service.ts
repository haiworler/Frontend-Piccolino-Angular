import { StorageService } from './../app-services/storage.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MainService } from '../app-services/main.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private _authService: AuthService,
		private _mainService: MainService,
		private _storageService: StorageService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
		if (state.url !== '/auth/login') {
			if (state.url === '/') {
				if (this._authService.isAuthenticated()) {
					this.router.navigate(["/dashboard"]);
					return true;
				} else {
					this._mainService.setUserData(null);
					this._authService.logout();
					return false;
				}
			}

			return new Promise(resolve => {
				if (this._authService.isAuthenticated()) {
					
						if (state.url === '/dashboard' || state.url === '/privileges') {
							resolve(true);
						} else {
							if (1) { // Aqui voy a validar los accesos
								this._storageService.setItem('token', localStorage.getItem('token'));
								resolve(true);
							} else {
								this.router.navigate(["/privileges"]);
								resolve(true);
							}
						}
						
				} else {
					this._mainService.setUserData(null);
					this._authService.logout();
					resolve(false);
				}
			});
		}

		// 	 if (state.url !== '/auth/login') {

		// 	 	if (state.url === '/') {
		// 	 		if (this._authService.isAuthenticated()) {
		// 	 			this.router.navigate(['/dashboard']);
		// 	 			return true;
		// 	 		} else {
		// 	 			this._mainService.setUserData(null);
		// 	 			this._authService.logout();
		// 	 			return false;
		// 	 		}
		// 	 	}

		// 	 	return new Promise(resolve => {

		// 	 		if (this._authService.isAuthenticated()) {
		// 	 			// this._mainService.userData(this._authService.currentUserValue.id).subscribe((response: any) => {
		// 	 			// 	this._mainService.setUserData(response.data);
		// 	 			 	if (state.url === '/dashboard' || state.url === '/privileges') {
		// 	 			 		resolve(true);
		// 	 			 	} else {
		// 	 			 		if (1) {
		// 	 						this._storageService.setItem('token', localStorage.getItem('token'));
		// 	 			 			resolve(true);
		// 	 			 		} else {
		// 	 			 			this.router.navigate(['/privileges']);
		// 	 			 			resolve(true);
		// 	 			 		}
		// 	 			 	}
		// 	 			// });
		// 	 		} else {
		// 	 			this._mainService.setUserData(null);
		// 	 			this._authService.logout();
		// 	 			resolve(false);
		// 	 		}

		// 	 	});
		//  }

	}

	resolve(route: ActivatedRouteSnapshot): any {
		return this._mainService.getUserData();
	}

}
