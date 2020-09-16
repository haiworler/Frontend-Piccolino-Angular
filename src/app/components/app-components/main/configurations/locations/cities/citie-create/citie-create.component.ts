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
  selector: 'app-citie-create',
  templateUrl: './citie-create.component.html',
  styles: [
  ]
})
export class CitieCreateComponent implements OnInit {

  townCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  town: any = [];
  dependences: any = [];
  departments: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _citieService: CitieService
  ) { }

  async ngOnInit() {

    this.townCreateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				name: ['', [Validators.required]],
				country: ['', [Validators.required]],
        department: ['', [Validators.required]]
      })
		});

		this.dependences = await this._citieService.dependences();
  }

  get basicData() {
		return this.townCreateForm.get('basic_data');
	}

	createTown = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			country: basicData.country.id,
			name: basicData.name,
			department_id: basicData.department.id
		};

		this._citieService.create(data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: 'La ciudad se ha registrado correctamente.'
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
