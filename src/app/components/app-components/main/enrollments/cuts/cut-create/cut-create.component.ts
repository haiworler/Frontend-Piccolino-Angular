import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../../global/form-regex';
/**
 * 
 */
import { CutService } from '@services/app-services/schools/cut.service';

@Component({
  selector: 'app-cut-create',
  templateUrl: './cut-create.component.html',
  styles: []
})
export class CutCreateComponent implements OnInit {

  cutCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  cut: any;

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _cutService: CutService
  ) { }

  ngOnInit() {
    this.cutCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
  }

  get basicData() {
    return this.cutCreateForm.get('basic_data');
  }

  createcut = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._cutService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El corte se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
