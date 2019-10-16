import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MainService } from '../app-services/main.service';
import { StorageService } from '../app-services/storage.service';

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

    //  return true;

    // Las URLs a continuación están sujetas a cambios
    if (state.url !== '/auth/login') {
      if (state.url === '/') {
        setTimeout(() => this.router.navigate(['/dashboard']), 100);
        return true;
      }
      return new Promise(resolve => {
        if (this._authService.isAuthenticated()) {
          this._storageService.setItem('token', localStorage.getItem('token'));

          /**
           * Aqui se validaran los permisos para saber si puede ingresar a las rutas o no
           */
          resolve(true);
        } else {
          this._mainService.setUserData(null);
          this._authService.logout();
          resolve(false);
        }
      });
    }
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._mainService.getUserData();
  }

}
