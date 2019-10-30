import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SubjectService {
	subject: any;
	subjects: any[];

	constructor(
		private http: HttpClient
	) { }

	getsubject = (): any => this.subject;
	setsubject = (subject: any) => this.subject = subject;

	getsubjects = (): any[] => this.subjects;
	setsubjects = (subjects: any) => this.subjects = subjects;

	async search(data: any, page = 0, pageSize = 5): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/subject?page=${page}&pageSize=${pageSize}`).toPromise();
	}



	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/subject`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(personId: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/subject/${personId}`, data).toPromise();
		return response.data;
	}




}
