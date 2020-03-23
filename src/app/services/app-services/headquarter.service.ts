import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HeadquarterService {

	headquarter: any;
	headquarters: any;
	
	constructor(private http: HttpClient) { }
  
	getheadquarter = (): any => this.headquarter;
	  setheadquarter = (headquarter: any) => this.headquarter = headquarter;
  
	  getheadquarters = (): any[] => this.headquarters;
	  setheadquarters = (headquarters: any) => this.headquarters = headquarters;
  
	  async search(data: any, page = 0, pageSize = 5): Promise<any> {
		  return await this.http.get(`${environment.UrlApi}/headquarters/datatable`, { params: data }).toPromise();
	  }
  
	  /**
	   * Consulta las dependencias de las headquarteras
	   */
	  async dependences(): Promise<any> {
		  const response: any = await this.http.get(`${environment.UrlApi}/headquarters/dependences`).toPromise();
		  return response;
	  }
  
	  /**
	   * Registra la headquartera
	   */
	  async create(data: any): Promise<any> {
		  const response: any = await this.http.post(`${environment.UrlApi}/headquarters`, data).toPromise();
		  return response.data;
	  }
  
	  /**
	   * Se actualiza a la headquartera
	   */
	  async update(headquarterId: number, data: any): Promise<any> {
		  const response: any = await this.http.put(`${environment.UrlApi}/headquarters/${headquarterId}`, data).toPromise();
		  return response.data;
	  }


}
