import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
	providedIn: 'root'
})
export class ExcelService {

	addLeadingZeroes = (number: number): string | number => (number < 10 ? `0${number}` : number);

	setFullStringDate = (date: Date): string => {
		return (
			`${date.getFullYear()}-${this.addLeadingZeroes(date.getMonth() + 1)}-${this.addLeadingZeroes(date.getDate())} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		);
	}

	toExportFileName = (excelFileName: string): string => `${excelFileName} - ${this.setFullStringDate(new Date())}.xlsx`;

	exportAsExcelFile = (json: any[], excelFileName: string): void => {
		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, { skipHeader: true });
		const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
	}

}
