import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PersonService {
	person: any;
	persons: any[];

	constructor(
		private http: HttpClient
	) { }

	getPerson = (): any => this.person;
	setPerson = (person: any) => this.person = person;

	getPersons = (): any[] => this.persons;
	setPersons = (persons: any) => this.persons = persons;

	async search(data: any, page = 0, pageSize = 5): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/person?page=${page}&pageSize=${pageSize}`).toPromise();
	}

	/**
	 * Consulta las dependencias de las personas
	 */
	async getDependence(dependenceName: string): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/${dependenceName}`).toPromise();
	}

	/**
	 * Registra la persona
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/person`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la persona
	 */
	async update(personId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/person/${personId}`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la persona
	 */
	async updatePeople(personId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/people/updatePeople/${personId}`, data).toPromise();
		return response.data;
	}



}
