import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { HeadquarterService } from '@services/app-services/headquarter.service';

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
    dependences:any;
	constructor(
		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _headquarterService: HeadquarterService,
	) { }

	async   ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.headquarter = this._headquarterService.getheadquarter();
		this.headquarterUpdateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				neighborhood: [[], [Validators.required]],
				observations: ['', [Validators.required]],
			})
		});
		this.dependences = await this._headquarterService.dependences();
		this.neighbourhood = this.dependences.neighborhoods;
		this.basicData.patchValue(this.headquarter);
	}

	get basicData() {
		return this.headquarterUpdateForm.get('basic_data');
	}



	updateHeadquarter = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			name: basicData.name,
			neighborhood_id: basicData.neighborhood.id,
			observations: basicData.observations,
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
