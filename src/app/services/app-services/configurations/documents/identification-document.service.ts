import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdentificationDocumentService {

  typeDocument: any;
  typeDocuments: any[];

  constructor(private http: HttpClient) { }

  gettypeDocument = (): any => this.typeDocument;
	settypeDocument = (typeDocument: any) => this.typeDocument = typeDocument;

	gettypeDocuments = (): any[] => this.typeDocuments;
	settypeDocuments = (typeDocuments: any) => this.typeDocuments = typeDocuments;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/typeDocuments/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra el documento de identificación
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/typeDocuments`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza el documento de identificación
	 */
	async update(typeDocument_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/typeDocuments/${typeDocument_id}`, data).toPromise();
		return response.data;
	}
}
