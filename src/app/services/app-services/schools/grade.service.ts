import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GradeService {

  grade: any;
	grades: any[];

  constructor(private http: HttpClient) { }

  getgrade = (): any => this.grade;
	setgrade = (grade: any) => this.grade = grade;

	getgrades = (): any[] => this.grades;
	setgrades = (grades: any) => this.grades = grades;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/grades/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/grades`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(grade_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/grades/${grade_id}`, data).toPromise();
		return response.data;
	}

}
