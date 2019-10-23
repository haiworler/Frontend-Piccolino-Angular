import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headquarter } from '../../interfaces/headquarter';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HeadquarterService {
	headquarter: Headquarter;
	headquarters: Headquarter[];

	constructor(
		private http: HttpClient
	) { }

	getHeadquarter = (): Headquarter => this.headquarter;
	setHeadquarter = (headquarter: any) => this.headquarter = headquarter;

	getHeadquarters = (): Headquarter[] => this.headquarters;
	setHeadquarters = (headquarters: any) => this.headquarters = headquarters;



	async search(data: any, page = '', pageSize = ''): Promise<any> {
		//return await this.http.get(`${environment.UrlApi}/headquarters/datatable`, { params: data }).toPromise();
		return await this.http.get(`${environment.UrlApi}/headquarter/?page=${page}&pageSize=${pageSize}`, { params: data }).toPromise();

	}


	/**
   * Tiene como objetivo Registrar la Sede
   * @param data
   * @returns void
   */
	public create(data: any): Observable<any> {
		return this.http.post(`${environment.UrlApi}/headquarter`, data);
	}

	async update(headquarterId: number, data: any):
		Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/headquarters/${headquarterId}`, data).toPromise();
		return response.data;
	}

	async delete(headquarterId: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/headquarters/${headquarterId}`).toPromise();
		return response.data;
	}


}
