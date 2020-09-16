import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalitieService {

  localitie: any;
	localities: any[];


  constructor(
    private http: HttpClient
  ) { }

  getlocalitie = (): any => this.localitie;
	setlocalitie = (localitie: any) => this.localitie = localitie;

	getlocalities = (): any[] => this.localities;
	setlocalities = (localities: any) => this.localities = localities;

	async all(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/localities`).toPromise();
		return response.data;
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/localities/datatable`, { params: data }).toPromise();
	}

	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/localities`, data).toPromise();
		return response.data;
	}

	async update(localitieID: number, data: any):
		Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/localities/${localitieID}`, data).toPromise();
		return response.data;
	}

	async delete(localitieID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/localities/${localitieID}`).toPromise();
		return response.data;
	}

	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/localities/dependences`).toPromise();
		return response;
	}
}
