import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-headquarter-update',
	templateUrl: './headquarter-update.component.html',
	styles: []
})
export class HeadquarterUpdateComponent implements OnInit {

	headquarterUpdateForm: FormGroup;

	userData: any;
	countryID: number;

	progress: boolean | number = false;
	neighbourhood: any;
	headquarter: any;

	constructor(
		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _headquarterService: HeadquarterService,
		public calendar: NgbCalendar
	) { }

	async   ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.headquarter = this._headquarterService.getHeadquarter();
		console.log('Lo que retorna el Set: ', this.headquarter);
		this.headquarterUpdateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				neighborhood: [[], [Validators.required]],
				state: [1, [Validators.required]],
				observations: ['', [Validators.required]],
				createAt: [this.calendar.getToday(), [Validators.required]]
			})
		});
		this.neighbourhood = await this._headquarterService.getNeighbourhood();

		this.basicData.patchValue(this.headquarter);
		this.basicData.get('admission_date').setValue(this.formatDatepiker(this.headquarter.createAt));
	}

	get basicData() {
		return this.headquarterUpdateForm.get('basic_data');
	}

	assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
	addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
	formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);

	/**
	* Toma la fecha y la transforma en formato NgDAtepiker
	*/

	formatDatepiker(dateString: string) {
		let date = new Date(dateString);
		return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
	}


	updateHeadquarter = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			name: basicData.name,
			neighborhoodId: basicData.neighborhood.id,
			state: basicData.state,
			observations: basicData.observations,
			createAt: this.formatJsonDate(basicData.createAt)
		}

		this._headquarterService.update(this.headquarter.id, data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: 'La Sede se ha actualizado correctamente.'
			});
		}).catch((response: any) => {
			this.progress = false;
		});
	}

}
