import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { SubjectService } from '@services/app-services/subject.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-subject-create',
	templateUrl: './subject-create.component.html',
	styles: []
})
export class SubjectCreateComponent implements OnInit {

	subjectCreateForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	subject: any;

	constructor(
		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _subjectService: SubjectService,
		public calendar: NgbCalendar
	) { }

	ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.subjectCreateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				state: [1, [Validators.required]],
			}),
			competencies: this.formBuilder.array([])
		});
	}

	get basicData() {
		return this.subjectCreateForm.get('basic_data');
	}
	get competencies() {
		return this.subjectCreateForm.get('competencies');
	}


	createCompetencie = () => {
		(this.competencies as FormArray).push(
			this.formBuilder.group({
				id: null,
				nameC: ['', [Validators.required]],
			})
		);
	}

	removeCompetencies = (event: any, competenciesIndex: number) => {
		event.preventDefault();
		(this.competencies as FormArray).removeAt(competenciesIndex);
	}

	createSubject = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const Competencies: any = (this.competencies as FormArray).getRawValue();

		console.log('Data Enviada, ', basicData);
		console.log('COmpetencias: ', Competencies);
		// const data = {
		// 	name: basicData.name,
		// 	neighborhoodId: basicData.neighborhood.id,
		// 	state: basicData.state,
		// 	observation: basicData.observation,
		// 	createAt: this.formatJsonDate(basicData.createAt)
		// }

		// this._subjectService.create(data).then((response: any) => {
		// 	this.progress = 1;
		// 	this._storageService.setItem('token', localStorage.getItem('token'));
		// 	this._modalService.close();
		// 	this._notificationService.success({
		// 		title: 'Información',
		// 		message: 'La Sede se ha registrado correctamente.'
		// 	});
		// }).catch((response: any) => {
		// 	this.progress = false;
		// });
	}

}
