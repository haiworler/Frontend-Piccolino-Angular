import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrolledService {
  enrolled: any;
	enrolleds: any[];

  constructor(private http: HttpClient) { }

    getenrolled = (): any => this.enrolled;
	setenrolled = (enrolled: any) => this.enrolled = enrolled;

	getenrolleds = (): any[] => this.enrolleds;
	setenrolleds = (enrolleds: any) => this.enrolleds = enrolleds;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/enrolleds/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/enrolleds`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(enrolled_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/enrolleds/${enrolled_id}`, data).toPromise();
		return response.data;
	}
	/**
	 * Consulta las dependencias de las matrículas
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/enrolleds/dependences`).toPromise();
		return response;
	}

}
