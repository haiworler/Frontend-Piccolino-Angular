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
  selector: 'app-student-assign',
  templateUrl: './student-assign.component.html',
  styles: []
})
export class StudentAssignComponent implements OnInit {

  studentAssignForm: FormGroup;
  loadControl: any = 0;

  buttonsOp: any[] = [];
  permissions: any[];
  currentRoute: any;
  progress: boolean | number = false;

  studen: any = [];
  students: any = [];
  group: any = [];
  enrolleds: any = [];

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

  async ngOnInit() {
    this.group = this._groupService.getgroup();
    this.enrolleds = this._groupService.getEnrolleds();
    this.studentAssignForm = this.formBuilder.group({
      array_students: this.formBuilder.array([]),
    });

    this.arrayStudents.valueChanges.subscribe(value => {
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

    this.searchStudent();
  }

  async searchStudent() {
    let data = {
      semester_id: this.group.semester_id,
      enrolleds: this.enrolleds
    };
    let response = await this._groupService.studentList(this.group.id, data);
    this.createArrayStudent(response);
  }


  /**
   * Permite obtener los datos del formulario de la posición rates
   */
  get arrayStudents() {
    return this.studentAssignForm.get('array_students');
  }

  /**
 * Permite crear el array de las tarifas encontradas
 */
  createArrayStudent(response) {
    (this.arrayStudents as FormArray).clear();
    let countFormGroup = 0;
    this.students = [],
      response.forEach(student => {
        this.createFormArray(student);
        this.students.push({
          id: student.id,
          names: student.people.names,
          surnames: student.people.surnames,
          code: student.id,
          position: countFormGroup,
        });
        countFormGroup++;
      });
  }

  /**
* Crea una nueva posición en la variable studiantes
*/
  async createFormArray(student: any) {
    (this.arrayStudents as FormArray).push(
      this.formBuilder.group({
        id: student.id,
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
    let newArray = this.arrayStudents.value.map((obj: any) => {
      obj.update = (!this.marked ? true : false);
      return obj;
    });
    (this.arrayStudents as FormGroup).patchValue(newArray);
    this.marked = (!this.marked ? true : false);
  }

  /**
  * Realiza el registro del Objeto
  */
  registerAssignStudent = () => {
    swal.fire({
      title: '¿ Esta seguro(a) ?',
      text: '¿ De asignar al grupo los estudiantes seleccionadas ?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let studentData: any = (this.arrayStudents as FormGroup).getRawValue();
        let mapStudentData = studentData.filter((obj: any) => { if (obj.update) { return obj.id; } })
        const data = {
          group_id: this.group.id,
          students: mapStudentData.map((obj: any) => { return obj.id; }),
        };
        this._groupService.assignStudentsGroup(data).then((response: any) => {
          this.progress = 1;
          this._modalService.close();
          this._groupService.setSearchStudent(1);
          this._notificationService.success({
            title: 'Información',
            message: 'Los estudiantes se asignaron correctamente.'
          });
        }).catch((response: any) => {
          this.progress = false;
        });
      }
    })
  }


}
