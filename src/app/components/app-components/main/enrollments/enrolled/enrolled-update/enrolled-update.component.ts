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
import { EnrolledService } from '@services/app-services/schools/enrolled.service';
/**
 * Componente Pap-up
 */
import { GeneralSelectionRecordsComponent } from '../../../shared/selects/general-selection-records/general-selection-records.component'
import { GeneralSelectionRecordsService } from '@services/app-services/shared/general-selection-records.service';

@Component({
  selector: 'app-enrolled-update',
  templateUrl: './enrolled-update.component.html',
  styles: []
})
export class EnrolledUpdateComponent implements OnInit {

  enrolledUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  enrolled: any;

  dependences: any;
  headquarters: any = [];
  semesters: any[] = [];
  grades: any[] = [];
  people: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _enrolledService: EnrolledService,
    private _generalSelectionRecordsService: GeneralSelectionRecordsService
  ) { }

  async ngOnInit() {
    this.enrolled = this._enrolledService.getenrolled();
    console.log('this.enrolled. ', this.enrolled);
    console.log('this.enrolled. ', this.enrolled);
    this.enrolledUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        headquarter: [null, [Validators.required]],
        semester: [null, [Validators.required]],
        grade: [null, [Validators.required]],
        people: [null, [Validators.required]],
        people_id: [null, [Validators.required]],
        cost: [null, [Validators.required]],
        observations: null,
        document: null,
      })
    });
    this.dependences = await this._enrolledService.dependences();
    this.headquarters = this.dependences.headquarters;
    this.semesters = this.dependences.semesters.map((obj: any) => { return { id: obj.id, name: obj.code }; });
    this.grades = this.dependences.grades;
    this.basicData.get('people').disable();
    this.basicData.get('document').disable();
    this._generalSelectionRecordsService.getObj().subscribe(value => {
      if (value) {
        this.people = value;
        this.basicData.get('people').setValue(value.names);
        this.basicData.get('document').setValue(value.document_number);
        this.basicData.get('people_id').setValue(value.id);
      }
    });

    this.basicData.patchValue(this.enrolled);
    this.basicData.get('people_id').setValue(this.enrolled.people.id);
    this.basicData.get('people').setValue(this.enrolled.people.names);
    this.basicData.get('document').setValue(this.enrolled.people.document_number);
    this.basicData.get('semester').setValue({id: this.enrolled.semester.id, name: this.enrolled.semester.code});


  }


  get basicData() {
    return this.enrolledUpdateForm.get('basic_data');
  }

  updateEnrolled = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    let data = {
      people_id: basicData.people_id,
      headquarter_id: basicData.headquarter.id,
      cost: basicData.cost,
      semester_id: basicData.semester.id,
      observations: basicData.observations,
      grade_id: basicData.grade.id
    }
    this._enrolledService.update(this.enrolled.id,data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'La matrícula se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

  /**
 * Es para abrir el pop-up
 */
  openPapUp() {
    let nameFields = [
      'id',
      'names',
      'surnames'
    ];
    let namesColumns = [
      'Código',
      'Nombres',
      'Apellidos'
    ];
    this._generalSelectionRecordsService.setNameFields(nameFields);
    this._generalSelectionRecordsService.setNamesColumns(namesColumns);
    this._generalSelectionRecordsService.setNameUrl('enrolleds/getStudent');
    this._modalService.open({
      component: GeneralSelectionRecordsComponent,
      title: 'Lista de Estudiantes activos',
      size: 'modal-xl'
    });
  }


}
