import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class SemesterService {

	semester: any;
	semesters: any[];


	constructor(private http: HttpClient) { }

	getsemester = (): any => this.semester;
	setsemester = (semester: any) => this.semester = semester;

	getsemesters = (): any[] => this.semesters;
	setsemesters = (semesters: any) => this.semesters = semesters;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/semesters/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/semesters`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(semester_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/semesters/${semester_id}`, data).toPromise();
		return response.data;
	}

	/**
	 * Consulta las dependencias de las semestres
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/semesters/dependences`).toPromise();
		return response;
	}

}
