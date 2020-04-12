import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


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

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/subjects/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/subjects`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(subject_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/subjects/${subject_id}`, data).toPromise();
		return response.data;
	}


	async getTeachers(): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/subjects/getTeachers`).toPromise();
	}
	
/**
	 * Se asignan los maestros de la asignatura
	 */
	async assignTeacher(subject_id: number, data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/subjects/assignTeacher/${subject_id}`, data).toPromise();
		return response.data;
	}

}
