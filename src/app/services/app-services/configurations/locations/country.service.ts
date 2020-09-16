import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  country: any;
	countries: any[];

  constructor(private http: HttpClient) { }

  getCountry = (): any => this.country;
	setCountry = (country: any) => this.country = country;

	getCountries = (): any[] => this.countries;
	setCountries = (countries: any) => this.countries = countries;

	async all(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/countries`).toPromise();
		return response.data;
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/countries/datatable`, { params: data }).toPromise();
	}

	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/countries`, data).toPromise();
		return response.data;
	}

	async update(countryID: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/countries/${countryID}`, data).toPromise();
		return response.data;
	}

	async delete(countryID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/countries/${countryID}`).toPromise();
		return response.data;
	}

}
