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
  selector: 'app-grade-update',
  templateUrl: './grade-update.component.html',
  styles: []
})
export class GradeUpdateComponent implements OnInit {

  gradeUpdateForm: FormGroup;
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
    this.grade = this._gradeService.getgrade();
    this.gradeUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        code: null, 
      })
    });
    this.basicData.patchValue(this.grade);
  }

  get basicData() {
    return this.gradeUpdateForm.get('basic_data');
  }

  updateGrade = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._gradeService.update(this.grade.id,basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El grado se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
