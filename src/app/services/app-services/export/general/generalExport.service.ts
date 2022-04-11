import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GeneralExportService {

	data: any;
	datas: any;

	constructor(private http: HttpClient) { }

	getdata = (): any => this.data;
	setdata = (data: any) => this.data = data;

	getdatas = (): any[] => this.datas;
	setdatas = (datas: any) => this.datas = datas;

	/**
	  * Consulta las dependencias de los grupos
	  */
	async incomeCostsAndExpensesDependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/incomeCostsAndExpensesDependences`).toPromise();
		return response;
	}

	/**
	 * COnsulta los Datos
	 * @param data 
	 * @returns 
	 */
	 async getDataIncomeCostsAndExpensesDependences(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/schoolAccountingReportBySemester`, { params: data }).toPromise();
	}

	/**
	 * COnsulta los Datos
	 * @param data 
	 * @returns 
	 */
	 async getDataLicensePlateNumberReport(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/toObtainTheNumberOfEnrolmentsPerSemester`, { params: data }).toPromise();
	}

}
