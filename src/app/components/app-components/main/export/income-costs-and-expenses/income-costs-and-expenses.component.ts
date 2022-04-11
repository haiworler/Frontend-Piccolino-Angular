import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { GeneralExportService } from '@services/app-services/export/general/generalExport.service';
import { IncomeCostsAndExpenseService } from '@services/app-services/export/pdf/income-costs-and-expense.service';



@Component({
	selector: 'app-income-costs-and-expenses',
	templateUrl: './income-costs-and-expenses.component.html',
	styles: [
	]
})
export class IncomeCostsAndExpensesComponent implements OnInit {

	incomeCostsAndExpensesForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	group: any;
	dependences: any = [];
	semesters: any = [];
	headquarters: any = [];

	constructor(

		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _generalExportService: GeneralExportService,
		private _incomeCostsAndExpenseService: IncomeCostsAndExpenseService

	) { }

	async ngOnInit() {

		this.userData = JSON.parse(localStorage.getItem('user'));
		this.incomeCostsAndExpensesForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				semester: [null, [Validators.required]],
				headquarter: [null, [Validators.required]],
			})
		});

		this.dependences = await this._generalExportService.incomeCostsAndExpensesDependences();
		this.semesters = this.dependences.semesters.map((element: any) => { return { name: element.code, id: element.id } });
		this.headquarters = this.dependences.headquarters;
	}

	get basicData() {
		return this.incomeCostsAndExpensesForm.get('basic_data');
	}


	async export() {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			semester_id: basicData.semester.id,
			headquarter_id: basicData.headquarter.id,
		}
		return await this._generalExportService.getDataIncomeCostsAndExpensesDependences(data).then((response: any) => {
			this._storageService.setItem('token', localStorage.getItem('token'));
			if (response) {
				this.generatePDF(response.data);
			} else {
				this._notificationService.warning({
					title: 'Información',
					message: 'No se encontro información.'
				});
			}
		}).catch((response: any) => {
			this.progress = false;
		});
	}


	generatePDF(data: any) {
		this._incomeCostsAndExpenseService.generatePDF(data);

		//	this._excelJSService.generateExcel(data);
	}

}
