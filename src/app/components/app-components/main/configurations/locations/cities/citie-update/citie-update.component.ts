import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { CitieService } from '@services/app-services/configurations/locations/citie.service';

@Component({
  selector: 'app-citie-update',
  templateUrl: './citie-update.component.html',
  styles: [
  ]
})
export class CitieUpdateComponent implements OnInit {


  townUpdateForm: FormGroup;

	userData: any;
	town: any;

	progress: boolean | number = false;

	dependences: any;
	departments: any;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _citieService: CitieService
  ) { }

  async  ngOnInit() {
    this.town = this._citieService.getTown();

    this.townUpdateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				country: ['', [Validators.required]],
        department: ['', [Validators.required]]
      })
    });
    this.basicData.patchValue({
			'name': this.town.name,
			'country': this.town.department.country,
			'department': this.town.department,
		});

		this.dependences = await this._citieService.dependences();
  }

  get basicData() {
		return this.townUpdateForm.get('basic_data');
	}

	updateTown = () => {

		const basicData: any = (this.basicData as FormGroup).getRawValue();

		const data = {
			name: basicData.name,
			country_id: basicData.country.id,
      department_id: basicData.department.id
    		};

		this._citieService.update(this.town.id, data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: 'La ciudad se ha actualizado correctamente.'
			});
		}).catch((response: any) => {
			this.progress = false;
		});
	}
	async getDepartments(data: any) {
		this.basicData.patchValue({department: ""});
		this.departments = await this._citieService.getDpeartments(data.value.id);
	}

}
