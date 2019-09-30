import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataDependencyManagerService {

  public dependencies: any;

  constructor() {
    this.dependencies = {};
  }


  /**
   * Tiene como objetivo registrar una dependencia
   * @author Luis Eduardo Garizabalo Acosta
   * @param key la llave que va a tener la dependencia
   * @param value objeto/arreglo con todos los valores asociados a la dependencia
   * @return void
   */
  public registerDependencies(key: string, value: any): void {
    this.dependencies[key] = value;
  }

  /**
   * Tiene como objetivo obtener una dependencia a partir de su llave
   * @author Luis Eduardo Garizabalo Acosta
   * @param key con la llave de la cual se quiere extraer la dependencia
   * @returns objeto con la dependencia solicitada
   */
  public getDependency(key: string): any {
    if (!this.dependencies.hasOwnProperty(key)) {
      console.warn(`Dependencia: ${key}, no encontrada`);
      return [];
    }
    return this.dependencies[key];
  }

  /**
   * Tiene como objetivo obtener todas las dependencias registradas
   * @author Luis Eduardo Garizabalo Acosta
   * @returns objeto con todas las dependencias
   */
  public getDependencies(): any {
    return this.dependencies;
  }

  /**
   * Tiene como objetivo limpiar o eliminar una dependencia registrada.
   * @author Luis Eduardo Garizabalo Acosta
   * @param key llave con la cual se identifica una dependencia
   * @returns True si pudo limpiar la dependencia, false si no.
   */
  public cleanDependencies(key: String): boolean {
    if (!this.dependencies.hasOwnProperty(key)) {
      console.warn(`Dependencia: ${key}, no encontrada`);
      return false;
    }
    return delete this.dependencies[key.toString()];
  }

 

 
  /**
   * Tiene como objetivo Consultar  por id de registro en el array de la dependencia Indicada
   * @author Luis Eduardo Garizabalo Acosta
   * @param key 
   * @param Id 
   * @param field 
   */
  public consultRegisterDependencies(key: String, Id: String, field: String): boolean {
    if (!this.dependencies.hasOwnProperty(key)) {
      console.warn(`Dependencia: ${key}, no encontrada`);
      return false;
    }
    let Dependence = this.dependencies[key.toString()];
    let Data = null;
     Dependence.forEach(function (register) {
      if (register[field.toString()] == Id) {
        Data = register;
      }
    });
    return Data;

  }

   /**
   * Tiene como objetivo destruir las dependencias registradas
   * @author Luis Eduardo Garizabalo Acosta
   * @returns void
   */
  public destroyDependencies(): void {
    this.dependencies = {};
  }


}
