import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralSelectionRecordsService {

  data: any;
  datas: any[];
  nameUrl: String;
  namesColumns: any;
  nameFields: any;
  obj = new BehaviorSubject<string>(null);
  term:String;
  id = null;


  constructor(private http: HttpClient) {
    this.namesColumns = [
      'Código',// Ejemplos de como de deben indicar los nombre de las columnas
      'Nombre'
    ];
    this.datas = [
      { code: 'Código', name: 'Nombre' },// Ejemplo #1 
      { code: 'Código 2', name: 'Nombre 2' } // Ejemplos de como se debe llamar la data, con relación al nombre de las columnas
    ];
  }

  /**
   * Obtiene el objeto
   */
  getObj(): Observable<any> {
    return this.obj.asObservable();
  }
  /**
   * 
   * @param obj Setea el objeto
   */
  settObj(obje: any): void {
    this.obj.next(obje);
  }
  /**
   * Obtiene el objeto
   */
  removetObj(): void {
    this.obj.next(null);
  }


  getdata = (): any => this.data;
  setdata = (data: any) => this.data = data;

  getdatas = (): any[] => this.datas;
  setdatas = (datas: any) => this.datas = datas;
  /**
   * Setea el nombre de la URL a la cual se le va hacer la consulta.
   */
  setNameUrl = (nameUrl: String) => this.nameUrl = nameUrl;
  getNameUrl = (): String => this.nameUrl;
  /**
   * Indica el nombre de las columnas ha utilizar
   */
  getNamesColumns = (): any => this.namesColumns;
  setNamesColumns = (namesColumns: any) => this.namesColumns = namesColumns;
  /**
   * Indica los nombres de los campos en el listar
   */
  getNameFields = (): any => this.nameFields;
  setNameFields = (nameFields: any) => this.nameFields = nameFields;
  /**
   * Setea el parametro por el cual se realizara la consulta
   */
  setTerm = (term: String) => this.term = term;
  getTerm = (): String => this.term;
  /**
   * Setea el ID del objeto con el cual se esta realizando la consulta
   */
  setId = (id: String) => this.id = id;
  getId = (): String => this.id;


  // async all(): Promise<any> {
  //   const response: any = await this.http.get(`${environment.apiURL}/logisticStates`).toPromise();
  //   return response.data;
  // }

  async search(data: any): Promise<any> {
    return await this.http.get(`${environment.UrlApi}/${this.nameUrl}`, { params: data }).toPromise();
  }

  async create(data: any): Promise<any> {
    const response: any = await this.http.post(`${environment.UrlApi}/${this.nameUrl}`, data).toPromise();
    return response.data;
  }

  async update(dataID: number, data: any):
    Promise<any> {
    const response: any = await this.http.put(`${environment.UrlApi}/${this.nameUrl}/${dataID}`, data).toPromise();
    return response.data;
  }

  async delete(dataID: number): Promise<any> {
    const response: any = await this.http.delete(`${environment.UrlApi}/${this.nameUrl}/${dataID}`).toPromise();
    return response.data;
  }
}
