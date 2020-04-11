import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { SubjectService } from '@services/app-services/schools/subject.service';
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';


@Component({
  selector: 'app-assign-teachers',
  templateUrl: './assign-teachers.component.html',
  styles: []
})
export class AssignTeachersComponent implements OnInit {

  subjectUpdateForm: FormGroup;

  userData: any;

  progress: boolean | number = false;
  subject: any;

  dropdownSettings: IDropdownSettings = {}; // Variable para la parametrizacion de los Multi-Select
  ShowFilter = true; // Variable para la parametrización de los Multi-Select
  showAll = true; // Variable para la parametrización de los Multi-Select
  defaultData: any; // Variable para guardar la Data por Default
  peoples: any = [];



  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _subjectService: SubjectService,
  ) { }

  async ngOnInit() {
    console.log('aui ingreso');
    this.subject = this._subjectService.getsubject();
    console.log('subject: ', this.subject);
    this.userData = this._mainService.getUserData();
    this.subjectUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        code: [null, [Validators.required]],
        people: []
      })
    });
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'id',
      textField: 'names',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Remover todo',
      enableCheckAll: this.showAll,
      itemsShowLimit: 15,
      allowSearchFilter: this.ShowFilter
    };

    this.basicData.patchValue(this.subject);
    this.basicData.get("name").disable();
    this.basicData.get("code").disable();

    let response = await this._subjectService.getTeachers();
    this.peoples = response;

  }

  get basicData() {
    return this.subjectUpdateForm.get('basic_data');
  }

  assignSubject = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      name: basicData.name,
      code: basicData.code,
      people: basicData.people.map((obj: any) => obj.id),
    }
    this._subjectService.assignTeacher(this.subject.id, data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'Los maestros fueron asignados  correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
