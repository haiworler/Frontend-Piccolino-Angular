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
import swal from 'sweetalert2';


@Component({
  selector: 'app-schedule-update',
  templateUrl: './schedule-update.component.html',
  styles: []
})
export class ScheduleUpdateComponent implements OnInit {

  scheduleUpdateForm: FormGroup;
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
    this.schedule = this._groupService.getSchedule();
    console.log('this.schedule: ', this.schedule);
    this.userData = this._mainService.getUserData();
    this.scheduleUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        name: [null, [Validators.required]],
        day: [null, [Validators.required]]
      }),
      schedule_hour: this.formBuilder.array([])
    });
    this.basicData.patchValue(this.schedule);
    this.createUpdateHour(this.schedule.schedule_hours);
    this.dependences = await this._groupService.dependences();
    this.headquarters = this.dependences.headquarters;
    this.days = this.dependences.days;
    this.hours = this.dependences.hours;
    let responseSubjects = await this._groupService.subjectStudentList(this.group.id);
    this.subjects = responseSubjects.subjects;
  }

  get basicData() {
    return this.scheduleUpdateForm.get('basic_data');
  }
  get scheduleHour() {
    return this.scheduleUpdateForm.get('schedule_hour');
  }

  createUpdateHour = (competencies: any[]) => {
    if (competencies.length) {
      competencies.forEach((element: any) => {
        (this.scheduleHour as FormArray).push(
          this.formBuilder.group({
            id: element.id,
            hour: [element.hour, [Validators.required]],
            subject: element.subject,
            people: ((element.people) ? { id: element.people.id, name: `${element.people.names} ${element.people.surnames}` } : []),
            headquarter: [element.headquarter, [Validators.required]],
          })
        );
      }
      );
    }
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
    let scheduleHour: any = (this.scheduleHour as FormArray).at(Index).value;
    if (scheduleHour.id) {
      swal.fire({
        title: '¿ Esta seguro(a) ?',
        text: `¿ De eliminar la hora ?`,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this._groupService.deleteScheduleHour(scheduleHour.id).then((response: any) => {
            this._notificationService.success({
              title: 'Información',
              message: `La hora se ha eliminado correctamente.`
            });
            event.preventDefault();
            (this.scheduleHour as FormArray).removeAt(Index);
          });
        }
      })
    } else {
      event.preventDefault();
      (this.scheduleHour as FormArray).removeAt(Index);
    }
  }


  async getSubjectTeacher(event: any, Index: number) {
    let scheduleHour: any = (this.scheduleHour as FormArray).at(Index).value;
    if (scheduleHour.subject) {
      let response = await this._groupService.getSubjectTeacher(scheduleHour.subject.id);
      this.people = response.people.map((obj: any) => { return { id: obj.id, name: `${obj.names} ${obj.surnames}` }; });
    }
  }



  updateDay = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const scheduleHour: any = (this.scheduleHour as FormArray).getRawValue();
    const data = {
      name: basicData.name,
      group_id: this.group.id,
      day_id: basicData.day.id,
      scheduleHours: scheduleHour
    }
    this._groupService.updateScheduleDay(this.schedule.id,data).then((response: any) => {
      this.progress = 1;
      this._modalService.close();
      this._groupService.setSearchStudent(1);
      this._notificationService.success({
        title: 'Información',
        message: 'El día se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }


}
