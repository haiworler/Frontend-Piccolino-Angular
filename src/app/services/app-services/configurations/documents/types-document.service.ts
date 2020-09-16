import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TypesDocumentService {

	categoryDocument: any;
	categoryDocuments: any[];

	constructor(private http: HttpClient) { }
	
	getcategoryDocument = (): any => this.categoryDocument;
	setcategoryDocument = (categoryDocument: any) => this.categoryDocument = categoryDocument;

	getcategoryDocuments = (): any[] => this.categoryDocuments;
	setcategoryDocuments = (categoryDocuments: any) => this.categoryDocuments = categoryDocuments;

	async search(data: any): Promise<any> {
		return await this.http.get(`${environment.UrlApi}/categoryDocuments/datatable`, { params: data }).toPromise();
	}


	/**
	 * Registra el tipo de documento (Categories)
	 */
	async create(data: any): Promise<any> {
		const response: any = await this.http.post(`${environment.UrlApi}/categoryDocuments`, data).toPromise();
		return response.data;
	}

	/**
	 * Se actualiza el tipo de documento (Categories)
	 */
	async update(categoryDocument_id: number, data: any): Promise<any> {
		const response: any = await this.http.put(`${environment.UrlApi}/categoryDocuments/${categoryDocument_id}`, data).toPromise();
		return response.data;
	}

}
