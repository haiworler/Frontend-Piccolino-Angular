import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  department: any;
	departments: any[];

  constructor(
    private http: HttpClient
  ) { }

  getDepartment = (): any => this.department;
	setDepartment = (department: any) => this.department = department;

	getDepartments = (): any[] => this.departments;
	setDepartments = (departments: any) => this.departments = departments;

	async all(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/departments`).toPromise();
		return response.data;
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/departments/datatable`, { params: data }).toPromise();
	}

	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/departments`, data).toPromise();
		return response.data;
	}

	async update(departmentID: number, data: any):
		Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/departments/${departmentID}`, data).toPromise();
		return response.data;
	}

	async delete(departmentID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/departments/${departmentID}`).toPromise();
		return response.data;
	}

	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/departments/dependences`).toPromise();
		return response;
	}
}
