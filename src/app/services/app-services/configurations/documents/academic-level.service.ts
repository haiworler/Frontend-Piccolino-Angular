import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademicLevelService {

  trainingType: any;
  trainingTypes: any[];

  constructor(private http: HttpClient) { }

  gettrainingType = (): any => this.trainingType;
  settrainingType = (trainingType: any) => this.trainingType = trainingType;

  gettrainingTypes = (): any[] => this.trainingTypes;
  settrainingTypes = (trainingTypes: any) => this.trainingTypes = trainingTypes;

  async search(data: any): Promise<any> {
    return await this.http.get(`${environment.UrlApi}/trainingTypes/datatable`, { params: data }).toPromise();
  }


	/**
	 * Registra los niveles academicos
	 */
  async create(data: any): Promise<any> {
    const response: any = await this.http.post(`${environment.UrlApi}/trainingTypes`, data).toPromise();
    return response.data;
  }

	/**
	 * Se actualiza los niveles academicos
	 */
  async update(trainingType_id: number, data: any): Promise<any> {
    const response: any = await this.http.put(`${environment.UrlApi}/trainingTypes/${trainingType_id}`, data).toPromise();
    return response.data;
  }

}
