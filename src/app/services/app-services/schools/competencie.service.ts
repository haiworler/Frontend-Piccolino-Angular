import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetencieService {
  competencie: any;
	competencies: any[];

  constructor(private http: HttpClient) { }
  getcompetencie = (): any => this.competencie;
	setcompetencie = (competencie: any) => this.competencie = competencie;

	getcompetencies = (): any[] => this.competencies;
	setcompetencies = (competencies: any) => this.competencies = competencies;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/competencies/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/competencies`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(competencie_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/competencies/${competencie_id}`, data).toPromise();
		return response.data;
  }
  
  async delete(competencieID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/competencies/${competencieID}`).toPromise();
		return response.data;
	}

}
