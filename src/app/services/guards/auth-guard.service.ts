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

    // Las URLs a continuación están sujetas a cambios
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
  }

  resolve(route: ActivatedRouteSnapshot) {
   console.log('No ingreso a ninguna ruta state: ');
    return this._mainService.getUserData();
  }

}