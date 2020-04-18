import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile: any;
	profiles: any[];

  constructor(private http: HttpClient) { }

  getprofile = (): any => this.profile;
	setprofile = (profile: any) => this.profile = profile;

	getprofiles = (): any[] => this.profiles;
	setprofiles = (profiles: any) => this.profiles = profiles;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/profiles/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra el perfil
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/profiles`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza el perfil
	 */
	async update(profile_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/profiles/${profile_id}`, data).toPromise();
		return response.data;
  }
  
  async delete(profileID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/profiles/${profileID}`).toPromise();
		return response.data;
	}

	/**
	 * Consulta las dependencias del perfil
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/profiles/dependences`).toPromise();
		return response;
	}

}
