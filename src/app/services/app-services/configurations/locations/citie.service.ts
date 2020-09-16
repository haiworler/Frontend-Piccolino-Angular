import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitieService {

  town: any;
	towns: any[];

  constructor(
    private http: HttpClient
  ) { }

	getTown = (): any => this.town;
	setTown = (town: any) => this.town = town;

	getTowns = (): any[] => this.towns;
	setTowns = (towns: any) => this.towns = towns;

	async all(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/towns`).toPromise();
		return response.data;
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/towns/datatable`, { params: data }).toPromise();
	}

	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/towns`, data).toPromise();
		return response.data;
	}

	async update(townID: number, data: any):
		Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/towns/${townID}`, data).toPromise();
		return response.data;
	}

	async delete(townID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/towns/${townID}`).toPromise();
		return response.data;
	}

	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/towns/dependences`).toPromise();
		return response;
	}

	async getDpeartments(countryID: number): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/countries/departments/${countryID}`).toPromise();
		return response;
	}
}
