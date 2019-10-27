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
		return await this.http.get(`${environment.UrlApi}/headquarter/?page=${page}&pageSize=${pageSize}`, { params: data }).toPromise();
	}
	async searchbyname(name: any, page = '', pageSize = ''): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/headquarter/?name=${name}`).toPromise();

	}
	/**
   *
   * Tiene como objetivo Registrar la Sede
   */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/headquarter`, data).toPromise();
		return response.data;
	}

	async update(headquarterId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/headquarter/${headquarterId}`, data).toPromise();
		return response.data;
	}

	async delete(headquarterId: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/headquarter/${headquarterId}`).toPromise();
		return response.data;
	}


	async getNeighbourhood(): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/neighbourhood`).toPromise();
	}


}
