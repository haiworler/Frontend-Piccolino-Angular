import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { SubjectService } from '@services/app-services/schools/subject.service';
import { CompetencieService } from '@services/app-services/schools/competencie.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styles: []
})
export class SubjectUpdateComponent implements OnInit {

  subjectUpdateForm: FormGroup;

  userData: any;
  countryID: number;

  progress: boolean | number = false;
  subject: any;

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _subjectService: SubjectService,
    private _competencieService: CompetencieService
  ) { }

  ngOnInit() {
    this.subject = this._subjectService.getsubject();
    this.userData = this._mainService.getUserData();
    this.subjectUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        observations: null,
        credits: [null, [Validators.required]]
      }),
      competencies: this.formBuilder.array([])
    });

    this.basicData.patchValue(this.subject);
    this.createUpdateCompetencie(this.subject.competencies);

  }

  get basicData() {
    return this.subjectUpdateForm.get('basic_data');
  }
  get competencies() {
    return this.subjectUpdateForm.get('competencies');
  }

  createUpdateCompetencie = (competencies: any[]) => {
    if (competencies.length) {
      competencies.forEach((element: any) => {
        (this.competencies as FormArray).push(
          this.formBuilder.group({
            id: element.id,
            name: [element.name, [Validators.required]],
          })
        );
      }
      );
    }
  }


  createCompetencie = () => {
    (this.competencies as FormArray).push(
      this.formBuilder.group({
        id: null,
        name: ['', [Validators.required]],
      })
    );
  }

  removeCompetencies = (event: any, competenciesIndex: number) => {
    let competencie: any = (this.competencies as FormArray).at(competenciesIndex).value;
    if (competencie.id) {
      swal.fire({
        title: '¿ Esta seguro(a) ?',
        text: `¿ De eliminar la competencie ?`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this._competencieService.delete(competencie.id).then((response: any) => {
            this._storageService.setItem('token', localStorage.getItem('token'));
            this._notificationService.success({
              title: 'Información',
              message: `La competencie se ha eliminado correctamente.`
            });
            event.preventDefault();
            (this.competencies as FormArray).removeAt(competenciesIndex);
          });
        }
      })
    } else {
      event.preventDefault();
      (this.competencies as FormArray).removeAt(competenciesIndex);

    }

  }

  createSubject = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const Competencies: any = (this.competencies as FormArray).getRawValue();
    const data = {
      name: basicData.name,
      code: basicData.code,
      observations: basicData.observations,
      credits: basicData.credits,
      competencies: Competencies
    }
    this._subjectService.update(this.subject.id, data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'La Asignatura se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
