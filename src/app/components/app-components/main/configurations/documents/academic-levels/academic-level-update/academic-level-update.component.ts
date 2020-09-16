import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
/**
 * 
 */
import { AcademicLevelService } from '@services/app-services/configurations/documents/academic-level.service';

@Component({
  selector: 'app-academic-level-update',
  templateUrl: './academic-level-update.component.html',
  styles: [
  ]
})
export class AcademicLevelUpdateComponent implements OnInit {

  trainingTypeUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  trainingType: any;

  constructor(
    private formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _academicLevelService: AcademicLevelService
  ) { }

  ngOnInit(): void {
    this.trainingType = this._academicLevelService.gettrainingType();
    this.trainingTypeUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
      })
    });
    this.basicData.patchValue(this.trainingType);

  }

  get basicData() {
    return this.trainingTypeUpdateForm.get('basic_data');
  }

  UpdatetrainingType = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();

    this._academicLevelService.update(this.trainingType.id,basicData).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El nivel académico se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
