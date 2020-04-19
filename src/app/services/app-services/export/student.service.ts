import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  student: any;
  students: any;

  constructor(private http: HttpClient) { }

  getstudent = (): any => this.student;
	setstudent = (student: any) => this.student = student;

	getstudents = (): any[] => this.students;
	setstudents = (students: any) => this.students = students;

  /**
	 * Consulta las dependencias de las studentas
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/people/dependences`).toPromise();
		return response;
	}

	/**
	 * COnsula las personas segun su tipo o estado.
	 * @param data 
	 */
	async getPeopleExport(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/peopleExports`, { params: data }).toPromise();
	}
}
