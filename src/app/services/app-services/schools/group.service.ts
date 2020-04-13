import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GroupService {

	group: any;
	groups: any[];

	enrolleds = [];
	subjects = [];
	schedule = [];

	searchStudent = new BehaviorSubject<string>(null);


	constructor(private http: HttpClient) { }

	getgroup = (): any => this.group;
	setgroup = (group: any) => this.group = group;

	getgroups = (): any[] => this.groups;
	setgroups = (groups: any) => this.groups = groups;

	getEnrolleds = (): any => this.enrolleds;
	setEnrolleds = (enrolleds: any) => this.enrolleds = enrolleds;

	getSubjects = (): any => this.subjects;
	setSubjects = (subjects: any) => this.subjects = subjects;

	getSchedule = (): any => this.schedule;
	setSchedule = (schedule: any) => this.schedule = schedule;
	/**
   * Obtiene el objeto
   */
	getSearchStudent(): Observable<any> {
		return this.searchStudent.asObservable();
	}
	/**
	 * 
	 * @param obj Setea el objeto
	 */
	setSearchStudent(obje: any): void {
		this.searchStudent.next(obje);
	}

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/groups/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(group_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/groups/${group_id}`, data).toPromise();
		return response.data;
	}

	/**
	 * Consulta las dependencias de las matrículas
	 */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/groups/dependences`).toPromise();
		return response;
	}

	/**
	 * Obtiene la lista de matriculas asignadas al grupos
	 * @param groupId 
	 */
	async groupStudentList(groupId: number): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/groups/groupStudentList/${groupId}`).toPromise();
	}

	/**
	 * Remueve el estudiante de la lista
	 */
	async removeStudent(groupId: number, data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/removeStudent/${groupId}`, data).toPromise();
		return response.data;
	}

	/**
	 * Consulta las matriculas activas que el semestre sea igual al semestre del grupo
	 */
	async studentList(groupId: number, data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/studentList/${groupId}`, data).toPromise();
		return response;
	}

	/**
	 * Asigna los estudiantes seleecionados al grupo
	 */
	async assignStudentsGroup(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/assignStudentsGroup`, data).toPromise();
		return response;
	}

	/**
	 * Obtiene la lista de asignaturas asignadas al grupos
	 * @param groupId 
	 */
	async subjectStudentList(groupId: number): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/groups/subjectStudentList/${groupId}`).toPromise();
	}

	/**
	 * Remueve la asignatura de la lista del grupo
	 */
	async removeSubject(groupId: number, data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/removeSubject/${groupId}`, data).toPromise();
		return response.data;
	}

	/**
	 * Consulta las asignaturas activas
	 * 	 Que aun no se encuentren en el grupo
	 * */
	async subjectList(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/subjectList`, data).toPromise();
		return response;
	}

	/**
	 * Asigna las asignaturas seleecionados al grupo
	 */
	async assignSubjectsGroup(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/groups/assignSubjectsGroup`, data).toPromise();
		return response;
	}


	/**
	 * Obtiene la lista de horarios asignados al grupos
	 * @param groupId 
	 */
	async groupScheduleList(groupId: number): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/groups/groupScheduleList/${groupId}`).toPromise();
	}

	/**
	 * Obtiene la lista de maestros asignados a la asignatura
	 * @param groupId 
	 */
	async getSubjectTeacher(subjectId: number): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/groups/getSubjectTeacher/${subjectId}`).toPromise();
	}


	/**
	 * Crea el día del horario con sus horas
	 */
	async chreateSchedule(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/scheduleDays`, data).toPromise();
		return response;
	}

	/**
	 * Elimina la hora asignada al día del horario
	 * @param hoirID 
	 */
	async deleteScheduleHour(hoirID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/scheduleHours/${hoirID}`).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza el día del horario
	 */
	async updateScheduleDay(day_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/scheduleDays/${day_id}`, data).toPromise();
		return response.data;
	}

	/**
	 * Actualiza el estado del objeto SheduleDay
	 */
	async stateScheduleDay(scheduleDayId:number,data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/stateScheduleDay/${scheduleDayId}`, data).toPromise();
		return response;
	}

	/**
	 * Elimina el día asignada al día del horario
	 * @param dayID 
	 */
	async deleteScheduleDay(dayID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/scheduleDays/${dayID}`).toPromise();
		return response.data;
	}
}
