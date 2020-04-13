import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { FORM_REGEX } from '../../../../../global/form-regex';
/**
 * 
 */
import { GroupService } from '@services/app-services/schools/group.service';
import { GeneralSelectionRecordsService } from '@services/app-services/shared/general-selection-records.service';

@Component({
  selector: 'app-schedule-create',
  templateUrl: './schedule-create.component.html',
  styles: []
})
export class ScheduleCreateComponent implements OnInit {

  scheduleCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  schedule: any;
  group: any;
  dependences: any;
  headquarters: any = [];
  people: any[] = [];
  days: any = [];
  hours: any = [];
  subjects: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _groupService: GroupService,
    private _generalSelectionRecordsService: GeneralSelectionRecordsService
  ) { }

  async ngOnInit() {
    this.group = this._groupService.getgroup()
    this.userData = this._mainService.getUserData();
    this.scheduleCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        day: [null, [Validators.required]]
      }),
      schedule_hour: this.formBuilder.array([])
    });

    this.dependences = await this._groupService.dependences();
    this.headquarters = this.dependences.headquarters;
    this.days = this.dependences.days;
    this.hours = this.dependences.hours;
    let responseSubjects = await this._groupService.subjectStudentList(this.group.id);
    this.subjects = responseSubjects.subjects;
  }

  get basicData() {
    return this.scheduleCreateForm.get('basic_data');
  }
  get scheduleHour() {
    return this.scheduleCreateForm.get('schedule_hour');
  }

  createHour = () => {
    (this.scheduleHour as FormArray).push(
      this.formBuilder.group({
        id: null,
        hour: [[], [Validators.required]],
        subject: [],
        people: [],
        headquarter: [[], [Validators.required]],
      })
    );
  }

  removescheduleHour = (event: any, Index: number) => {
    event.preventDefault();
    (this.scheduleHour as FormArray).removeAt(Index);
  }


  async getSubjectTeacher(event: any, Index: number) {
    console.log('index:', Index);
    let scheduleHour: any = (this.scheduleHour as FormArray).at(Index).value;
    console.log('scheduleHour: ', scheduleHour);
    if (scheduleHour.subject) {
      let response = await this._groupService.getSubjectTeacher(scheduleHour.subject.id);
      console.log('Si ingreso, respuesta: ', response);
      this.people = response.people.map((obj:any)=>{ return {id: obj.id, name: `${obj.names} ${obj.surnames}`};});
    }
  }
  createSubject = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const scheduleHour: any = (this.scheduleHour as FormArray).getRawValue();
    const data = {
      name: basicData.name,
      group_id: this.group.id,
      day_id: basicData.day.id,
      scheduleHours: scheduleHour
    }
    this._groupService.chreateSchedule(data).then((response: any) => {
      this.progress = 1;
      this._modalService.close();
      this._groupService.setSearchStudent(1);
      this._notificationService.success({
        title: 'Información',
        message: 'El día se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
