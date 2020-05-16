import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
/**
 * 
 */
import { GroupService } from '@services/app-services/export/group.service';
import { ExcelJSService } from '@services/app-services/export/excel-js.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styles: []
})
export class GroupComponent implements OnInit {

  groupCreateForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	group: any;
	dependences: any = [];
	semesters: any = [];
	title: string = 'INFORME DE PERSONAS';
	name: string = 'INFORME PICCOLINO SOFTWARE';
	header: any = [
		'Nombres',
		'Apellidos',
		'Tipo de documento',
		'Número de documento',
		'Genero',
		'Tipo de persona',
		'Fecha de nacimiento',
		'Dirección',
		'Barrio',
		'Telefono',
		'Celular',
		'Correo',
		'RH',
		'EPS'];

  constructor(

    private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		public calendar: NgbCalendar,
		private _groupService: GroupService,
		private _excelJSService: ExcelJSService
  ) { }

  async ngOnInit() {

    this.userData = JSON.parse(localStorage.getItem('user'));
		this.groupCreateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				semester: [null, [Validators.required]],
				group: null
			})
		});

		this.dependences = await this._groupService.dependencesExport();
		console.log('Deendencies: ', this.dependences);
		this.semesters = this.dependences.semesters.map((element:any)=>{ return {name: element.code, id: element.id}});
  }

  get basicData() {
		return this.groupCreateForm.get('basic_data');
	}

	async export() {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			type_people_id: ((basicData.type_people) ? basicData.type_people.id : null),
			enabled: ((basicData.state) ? 1 : 0)
		}
		// return await this._groupService.getPeopleExport(data).then((response: any) => {
		// 	this._storageService.setItem('token', localStorage.getItem('token'));
		// 	if (response.data.length) {
		// 		console.log('Data ANtes de: ', response.data);
		// 		let data = response.data.map((obj: any) => {
		// 			return [obj.names, obj.surnames,
		// 			obj.type_document.name, obj.document_number,
		// 			obj.gender.name, obj.type_people.name,
		// 			obj.birth_date,
		// 			obj.address_residence,
		// 			obj.neighborhood.name,
		// 			obj.phone,
		// 			obj.cell,
		// 			obj.email,
		// 			obj.rh,
		// 			obj.eps];
		// 		});
		// 		console.log('Data: ', data);
		// 		this.generateExcel(data);
		// 	} else {
		// 		this._notificationService.warning({
		// 			title: 'Información',
		// 			message: 'No se encontraron registro.'
		// 		});
		// 	}
		// }).catch((response: any) => {
		// 	console.log('Error', response);
		// 	this.progress = false;
		// });
	}


	generateExcel(data: any) {

		this._excelJSService.generateExcel(data);
	}

}
