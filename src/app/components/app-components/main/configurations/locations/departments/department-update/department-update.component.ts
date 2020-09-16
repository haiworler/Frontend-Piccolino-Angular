import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../../../global/form-regex';
/**
 * 
 */
import { DepartmentService } from '@services/app-services/configurations/locations/department.service';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styles: [
  ]
})
export class DepartmentUpdateComponent implements OnInit {

  departmentUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  department: any;
  dependences: any;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _departmentService: DepartmentService
  ) { }

  async ngOnInit() {
    this.department = this._departmentService.getDepartment();
    this.departmentUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: ['', [Validators.required]],
        country: ['', [Validators.required]],
      })
    });
    this.basicData.patchValue(this.department);

    this.dependences = await this._departmentService.dependences();
  }

  get basicData() {
		return this.departmentUpdateForm.get('basic_data');
	}

	updateDepartment = () => {

		const basicData: any = (this.basicData as FormGroup).getRawValue();

		const data = {
			name: basicData.name,
      country_id: basicData.country.id
    };

		this._departmentService.update(this.department.id, data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: `El departamento se ha actualizado correctamente.`
			});
		}).catch((response: any) => {
			this.progress = false;
		});
	}

}
