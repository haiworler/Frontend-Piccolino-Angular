import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CutService {

  cut: any;
  cuts: any[];
  
  constructor(private http: HttpClient) { }

  getcut = (): any => this.cut;
	setcut = (cut: any) => this.cut = cut;

	getcuts = (): any[] => this.cuts;
	setcuts = (cuts: any) => this.cuts = cuts;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/cuts/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/cuts`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(cut_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/cuts/${cut_id}`, data).toPromise();
		return response.data;
	}

}
