import { Injectable } from '@angular/core';
import { HandleLoadingObservable } from '../observables/handleLoading.observable';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private isLoading: boolean;

  constructor(private handleLoadingObservable: HandleLoadingObservable) {
    // Aqui registraremos las funciones generales de todo el sistema
  }

  


 

  

}
