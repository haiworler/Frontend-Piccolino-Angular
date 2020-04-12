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
import { GradeService } from '@services/app-services/schools/grade.service';

@Component({
  selector: 'app-grade-create',
  templateUrl: './grade-create.component.html',
  styles: []
})
export class GradeCreateComponent implements OnInit {

  gradeCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  grade: any;

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _gradeService: GradeService,
  ) { }

  ngOnInit() {
    this.gradeCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        code: null, 
      })
    });

  }

  get basicData() {
    return this.gradeCreateForm.get('basic_data');
  }

  creategrade = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._gradeService.create(basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El grado se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
