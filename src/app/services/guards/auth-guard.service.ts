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
		//return true;
		 if (state.url !== '/auth/login') {
		 	console.log('Ingreso al cguardian porque la URL es distin');
		 	if (state.url === '/') {
		 		console.log('Soy el Guardian ingreso al /');
		 		setTimeout(() => this.router.navigate(['/dashboard']), 100);
		 		console.log('Soy guardian en / y retorno true');
		 		return true;
		 	}
		 	return new Promise(resolve => {
		 		console.log('Soy EL Guardian Ingreso a la provemesa');
		 		if (this._authService.isAuthenticated()) {
		 			this._storageService.setItem('token', localStorage.getItem('token'));

		 			console.log('Soy el Guardian Ingreso al If porque si tengo datos en el isauten retorno true');
		 			/**
		 			 * Aqui se validaran los permisos para saber si puede ingresar a las rutas o no
		 			 */
		 			resolve(true);
		 		} else {
		 			console.log('Soy el Guardian no ingrese a nda porque no tengo datos y retorno false');
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
