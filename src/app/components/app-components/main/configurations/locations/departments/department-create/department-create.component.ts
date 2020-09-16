import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { DepartmentService } from '@services/app-services/configurations/locations/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styles: [
  ]
})
export class DepartmentCreateComponent implements OnInit {

  departmentCreateForm: FormGroup;
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
    this.departmentCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: ['', [Validators.required]],
        country: ['', [Validators.required]],
      })
    });
    this.dependences = await this._departmentService.dependences();
  }

  get basicData() {
    return this.departmentCreateForm.get('basic_data');
  }

  createDepartment = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      name: basicData.name,
      country_id: basicData.country.id
    };
    this._departmentService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: `El departamento se ha registrado correctamente.`
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
