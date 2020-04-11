import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  people: any;
  peoples: any;
  constructor(private http: HttpClient) { }

  getpeople = (): any => this.people;
	setpeople = (people: any) => this.people = people;

	getpeoples = (): any[] => this.peoples;
	setpeoples = (peoples: any) => this.peoples = peoples;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/people/datatable`, { params: data }).toPromise();
	}

	/**
	 * Consulta las dependencias de las peopleas
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/people/dependences`).toPromise();
		return response;
	}

	/**
	 * Registra la peoplea
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/people`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la peoplea
	 */
	async update(peopleId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/people/${peopleId}`, data).toPromise();
		return response.data;
	}

}
