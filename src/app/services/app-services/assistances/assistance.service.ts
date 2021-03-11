import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  assistance: any;
	assistances: any[];
	register = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  getassistance = (): any => this.assistance;
	setassistance = (assistance: any) => this.assistance = assistance;

	getassistances = (): any[] => this.assistances;
	setassistances = (assistances: any) => this.assistances = assistances;

	/**
   * Obteiene el value
   */
	getRegister(): Observable<any> {
		return this.register.asObservable();
	}
	/**
	 * Setea el value
	 */
	setRegister(register: any): void {
		this.register.next(register);
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/assistance/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/assistances`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(assistance_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/assistances/${assistance_id}`, data).toPromise();
		return response.data;
	}

	/**
	   * Consulta las dependencias de las matrículas
	   */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/assistance/dependences`).toPromise();
		return response;
	}

	/**
	 * Obtiene los grupos asignados al maestro que sean del semestre
	 * @param data 
	 */
	async getGroupTeacher(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/assistances/getGroupTeacher`, { params: data }).toPromise();
	}

	/**
	 *Consulta las materias asignasd al grupo del semestre a las cuales el profesor
	 da clase
	 * @param data 
	 */
	async getSubjectTeacher(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/assistances/getSubjectTeacher`, { params: data }).toPromise();
	}

	/**
	 *Consulta las matrículas que no tengan ya notas registradas en esa materia, semestre y corte
	 * @param data 
	 */
	async getPeopleGroupassistance(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/assistances/getPeopleGroupassistance`, { params: data }).toPromise();
	}

	/**
	 *Consulta las matrículas que  tengan ya notas registradas en esa materia, semestre y corte
	 * @param data 
	 */
	async getPeopleGroupassistanceUpdate(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/assistances/getPeopleGroupassistanceUpdate`, { params: data }).toPromise();
	}
	/**
	 * Elimina la calificación
	 * @param assistanceID 
	 */
	async delete(assistanceID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/assistances/${assistanceID}`).toPromise();
		return response.data;
	}
}
