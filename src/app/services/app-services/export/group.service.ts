import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  group: any;
  groups: any;

  constructor(private http: HttpClient) { }
  getgroup = (): any => this.group;
	setgroup = (group: any) => this.group = group;

	getgroups = (): any[] => this.groups;
  setgroups = (groups: any) => this.groups = groups;
  
   /**
	 * Consulta las dependencias de los grupos
	 */
	async dependencesExport(): Promise<any> {
		const response: any = await this.http.get(`${environment.UrlApi}/groupsDependencesExport`).toPromise();
		return response;
	}
}
