import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
	selector: 'app-headquarter-create',
	templateUrl: './headquarter-create.component.html',
	styles: []
})
export class HeadquarterCreateComponent implements OnInit {


	headquarterCreateForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	neighbourhood: any;
	neighbourhoods: any;
	headquarter: any;
    dependences:any;
	constructor(
		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _headquarterService: HeadquarterService,
		public calendar: NgbCalendar
	) { }

	async ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.headquarterCreateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				neighborhood: [[], [Validators.required]],
				observation: ['', [Validators.required]],
			})
		});
		this.dependences = await this._headquarterService.dependences();
		this.neighbourhoods = this.dependences.neighborhoods;
	}

	get basicData() {
		return this.headquarterCreateForm.get('basic_data');
	}

	assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
	addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
	formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);

	createHeadquarter = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			name: basicData.name,
			neighborhood_id: basicData.neighborhood.id,
			observations: basicData.observation,
		}
		this._headquarterService.create(data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: 'La Sede se ha registrado correctamente.'
			});
		}).catch((response: any) => {
			this.progress = false;
		});
	}


}
