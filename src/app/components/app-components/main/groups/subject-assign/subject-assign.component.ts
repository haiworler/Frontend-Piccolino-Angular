import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

/**
 * Creados
 */
import { GroupService } from '@services/app-services/schools/group.service';

@Component({
  selector: 'app-subject-assign',
  templateUrl: './subject-assign.component.html',
  styles: []
})
export class SubjectAssignComponent implements OnInit {

  subjectAssignForm: FormGroup;
  loadControl: any = 0;

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;
  progress: boolean | number = false;

  studen: any = [];
  subjects: any = [];
  group: any = [];
  arraysubject: any = [];

  marked: boolean | number = false;
  changes: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _storageService: StorageService,
    private _notificationService: NotificationsService,
    private _groupService: GroupService,
    private _mainService: MainService,
    private router: Router
  ) { }

  ngOnInit() {
    this.group = this._groupService.getgroup();
    this.arraysubject = this._groupService.getSubjects();
    this.subjectAssignForm = this.formBuilder.group({
      array_subjects: this.formBuilder.array([]),
    });

    this.arraysubjects.valueChanges.subscribe(value => {
      let cont = 0;
      value.forEach(rate => {
        if (rate.update) {
          cont = 1;
        }
      })
      if (cont) {
        this.changes = true;
      } else {
        this.changes = false;
      }
    });

    this.searchsubject();
  }
  async searchsubject() {
    let data = {
      subjects: this.arraysubject
    };
    let response = await this._groupService.subjectList(data);
    this.createArraysubject(response);
  }


  /**
   * Permite obtener los datos del formulario de la posición rates
   */
  get arraysubjects() {
    return this.subjectAssignForm.get('array_subjects');
  }

  /**
 * Permite crear el array de las tarifas encontradas
 */
  createArraysubject(response) {
    (this.arraysubjects as FormArray).clear();
    let countFormGroup = 0;
    this.subjects = [],
      response.forEach(subject => {
        this.createFormArray(subject);
        this.subjects.push({
          id: subject.id,
          name: subject.name,
          code: subject.code,
          position: countFormGroup,
        });
        countFormGroup++;
      });
  }

  /**
* Crea una nueva posición en la variable studiantes
*/
  async createFormArray(subject: any) {
    (this.arraysubjects as FormArray).push(
      this.formBuilder.group({
        id: subject.id,
        update: false
      })
    );
  }

  /**
	 * Realiza e control de as tarifas seleccionada a las cuales se les aplicara 
	 * la actualización
	 */
  selectAll() {
    let cont = 0;
    let newArray = this.arraysubjects.value.map((obj: any) => {
      obj.update = (!this.marked ? true : false);
      return obj;
    });
    (this.arraysubjects as FormGroup).patchValue(newArray);
    this.marked = (!this.marked ? true : false);
  }

  /**
  * Realiza el registro del Objeto
  */
  registerAssignsubject = () => {
    swal.fire({
      title: '¿ Esta seguro(a) ?',
      text: '¿ De asignar al grupo las materias seleccionadas ?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let subjectData: any = (this.arraysubjects as FormGroup).getRawValue();
        let mapsubjectData = subjectData.filter((obj: any) => { if (obj.update) { return obj.id; } })
        const data = {
          group_id: this.group.id,
          subjects: mapsubjectData.map((obj: any) => { return obj.id; }),
        };
        this._groupService.assignSubjectsGroup(data).then((response: any) => {
          this.progress = 1;
          this._modalService.close();
          this._groupService.setSearchStudent(1);
          this._notificationService.success({
            title: 'Información',
            message: 'Las signaturas se asignaron correctamente.'
          });
        }).catch((response: any) => {
          this.progress = false;
        });
      }
    })
  }

}
