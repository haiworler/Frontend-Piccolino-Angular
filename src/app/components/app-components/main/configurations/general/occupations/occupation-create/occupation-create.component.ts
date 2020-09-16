import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { OccupationsService } from '@services/app-services/configurations/general/occupations.service';

@Component({
  selector: 'app-occupation-create',
  templateUrl: './occupation-create.component.html',
  styles: [
  ]
})
export class OccupationCreateComponent implements OnInit {

  occupationCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  occupation: any;

  constructor(
    private formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _occupationsService: OccupationsService
  ) { }

  ngOnInit(): void {
    this.occupationCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
  }

  get basicData() {
    return this.occupationCreateForm.get('basic_data');
  }

  createoccupation = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._occupationsService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'La ocupación se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
