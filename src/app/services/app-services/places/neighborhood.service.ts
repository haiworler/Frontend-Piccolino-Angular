import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  neighborhood: any;
  neighborhoods: any;
  
  constructor(private http: HttpClient) { }

  getneighborhood = (): any => this.neighborhood;
	setneighborhood = (neighborhood: any) => this.neighborhood = neighborhood;

	getneighborhoods = (): any[] => this.neighborhoods;
	setneighborhoods = (neighborhoods: any) => this.neighborhoods = neighborhoods;

	async search(data: any, page = 0, pageSize = 5): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/neighborhoods/datatable`, { params: data }).toPromise();
	}

	/**
	 * Consulta las dependencias de las neighborhoodas
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/neighborhoods/dependences`).toPromise();
		return response;
	}

	/**
	 * Registra la neighborhooda
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/neighborhoods`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la neighborhooda
	 */
	async update(neighborhoodId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/neighborhoods/${neighborhoodId}`, data).toPromise();
		return response.data;
	}

}
