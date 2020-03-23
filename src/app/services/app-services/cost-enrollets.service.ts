import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CostEnrolletsService {

  costEnrollet: any;
	costEnrollets: any;

  constructor(private http: HttpClient) { }

	getcostEnrollet = (): any => this.costEnrollet;
	setcostEnrollet = (costEnrollet: any) => this.costEnrollet = costEnrollet;

	getcostEnrollets = (): any[] => this.costEnrollets;
	setcostEnrollets = (costEnrollets: any) => this.costEnrollets = costEnrollets;

	async search(data: any, page = 0, pageSize = 5): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/costEnrollets?page=${page}&pageSize=${pageSize}`).toPromise();
	}

	/**
	 * Consulta las dependencias de las costEnrolletas
	 */
	async getDependence(dependenceName: string): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/${dependenceName}`).toPromise();
	}

	/**
	 * Registra la costEnrolleta
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/costEnrollets`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la costEnrolleta
	 */
	async update(costEnrolletId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/costEnrollets/${costEnrolletId}`, data).toPromise();
		return response.data;
	}

}
