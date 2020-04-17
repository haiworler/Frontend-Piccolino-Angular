import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NoteService {

	note: any;
	notes: any[];
	register = new BehaviorSubject<string>(null);


	constructor(private http: HttpClient) { }

	getnote = (): any => this.note;
	setnote = (note: any) => this.note = note;

	getnotes = (): any[] => this.notes;
	setnotes = (notes: any) => this.notes = notes;

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
		return await this.http.get(`${environment.UrlApi}/notes/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra la asignatura
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/notes`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza a la asignatura
	 */
	async update(note_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/notes/${note_id}`, data).toPromise();
		return response.data;
	}

	/**
	   * Consulta las dependencias de las matrículas
	   */
	async dependences(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/notes/dependences`).toPromise();
		return response;
	}

	/**
	 * Obtiene los grupos asignados al maestro que sean del semestre
	 * @param data 
	 */
	async getGroupTeacher(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/notes/getGroupTeacher`, { params: data }).toPromise();
	}

	/**
	 *Consulta las materias asignasd al grupo del semestre a las cuales el profesor
	 da clase
	 * @param data 
	 */
	async getSubjectTeacher(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/notes/getSubjectTeacher`, { params: data }).toPromise();
	}

	/**
	 *Consulta las matrículas que no tengan ya notas registradas en esa materia, semestre y corte
	 * @param data 
	 */
	async getPeopleGroupNote(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/notes/getPeopleGroupNote`, { params: data }).toPromise();
	}

	/**
	 *Consulta las matrículas que  tengan ya notas registradas en esa materia, semestre y corte
	 * @param data 
	 */
	async getPeopleGroupNoteUpdate(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/notes/getPeopleGroupNoteUpdate`, { params: data }).toPromise();
	}
	/**
	 * Elimina la calificación
	 * @param noteID 
	 */
	async delete(noteID: number): Promise<any> {
		const response: any = await this.http.delete(`${environment.UrlApi}/notes/${noteID}`).toPromise();
		return response.data;
	}

}
