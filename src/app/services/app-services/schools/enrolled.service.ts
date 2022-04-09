import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrolledService {
  enrolled: any;
	enrolleds: any[];

	payment: any;
	payments: any[];

  constructor(private http: HttpClient) { }

    getenrolled = (): any => this.enrolled;
	setenrolled = (enrolled: any) => this.enrolled = enrolled;

	getenrolleds = (): any[] => this.enrolleds;
	setenrolleds = (enrolleds: any) => this.enrolleds = enrolleds;

	getpayment = (): any => this.payment;
	setpayment = (payment: any) => this.payment = payment;

	getpayments = (): any[] => this.payments;
	setpayments = (payments: any) => this.payments = payments;

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

	/**
	 * COnsulta los pagos realizados a una matricula
	 * @param data 
	 * @returns 
	 */
	async getPaymentEnrolled(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/payments`, { params: data }).toPromise();
	}

	/**
	 * Registra el aporte al valor de la matricula
	 */
	 async createPaymentEnrolled(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/payments`, data).toPromise();
		return response.data;
	}


}
