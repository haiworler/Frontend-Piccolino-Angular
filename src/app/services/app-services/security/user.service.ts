import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	user: any;
	users: any[];

	constructor(private http: HttpClient) { }

	getuser = (): any => this.user;
	setuser = (user: any) => this.user = user;

	getusers = (): any[] => this.users;
	setusers = (users: any) => this.users = users;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/users/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra el usuario
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/users`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza el usuario
	 */
	async update(user_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/users/${user_id}`, data).toPromise();
		return response.data;
	}

	async delete(userID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/users/${userID}`).toPromise();
		return response.data;
	}

	/**
	 * Consulta las dependencias del perfil
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/users/dependences`).toPromise();
		return response;
	}

}
