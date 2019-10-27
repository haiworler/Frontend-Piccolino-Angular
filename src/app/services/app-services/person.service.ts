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



}
