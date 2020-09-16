import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OccupationsService {

  occupation: any;
	occupations: any[];

  
  constructor(private http: HttpClient) { }

  getoccupation = (): any => this.occupation;
	setoccupation = (occupation: any) => this.occupation = occupation;

	getoccupations = (): any[] => this.occupations;
	setoccupations = (occupations: any) => this.occupations = occupations;

	async all(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/occupations`).toPromise();
		return response.data;
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/occupations/datatable`, { params: data }).toPromise();
	}

	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/occupations`, data).toPromise();
		return response.data;
	}

	async update(occupationID: number, data: any):
		Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/occupations/${occupationID}`, data).toPromise();
		return response.data;
	}
}
