import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FORM_REGEX } from '../../../../../../global/form-regex';

import { PeopleService } from '@services/app-services/people/people.service';

@Component({
  selector: 'app-voluntary-create',
  templateUrl: './voluntary-create.component.html',
  styles: []
})
export class VoluntaryCreateComponent implements OnInit {

  voluntaryCreateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  student: any;

  typePeoples: any[] = [];
  dependences: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _peopleService: PeopleService,
    public calendar: NgbCalendar
  ) { }

  async ngOnInit() {
    this.voluntaryCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        names: ['', [Validators.required]],
        surnames: ['', [Validators.required]],
        type_document: [[], [Validators.required]],
        document_number: ['', [Validators.required]],
        birth_date: [this.calendar.getToday(), [Validators.required]],
        town: [[], [Validators.required]],
        gender: [[], [Validators.required]],
        phone: null,
        cell: null,
        email: ['', [Validators.pattern(`${FORM_REGEX.email}`)]],
        address_residence: ['', [Validators.required]],
        neighborhood: [[], [Validators.required]],
        occupation: [[], [Validators.required]]
      }),
      additional_data: this.formBuilder.group({
        rh: null,
        eps: null,
        observations: null,
        stratum: null,
        level_sisben: null,
        type_people: ['', [Validators.required]],
        history: null,
      })
    });

    this.dependences = await this._peopleService.dependences();
    this.typePeoples = this.dependences.typePeoples.filter((data: any) => {
      if (data.id == 3 || data.id == 4 || data.id == 5) {
        return data;
      }
    });
  }


  get basicData() {
    return this.voluntaryCreateForm.get('basic_data');
  }

  get additionalData() {
    return this.voluntaryCreateForm.get('additional_data');
  }


  assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
  addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
  formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);


  createStudent = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const additionalData: any = (this.additionalData as FormGroup).getRawValue();

    const data = {
      names: basicData.names,
      surnames: basicData.surnames,
      type_document_id: basicData.type_document.id,
      document_number: basicData.document_number,
      birth_date: this.formatJsonDate(basicData.birth_date),
      birth_town_id: basicData.town.id,
      gender_id: basicData.gender.id,
      phone: basicData.phone,
      cell: basicData.cell,
      email: basicData.email,
      address_residence: basicData.address_residence,
      neighborhood_id: basicData.neighborhood.id,
      occupation_id: basicData.occupation.id,
      rh: additionalData.rh,
      eps: additionalData.eps,
      observations: additionalData.observations,
      stratum: additionalData.stratum,
      level_sisben: additionalData.level_sisben,
      type_people_id: additionalData.type_people.id,
      history: additionalData.history
      // image: ((basicData.image.length > 0) ? basicData.image[0].file.name : '')
    }
    this._peopleService.create(data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El voluntario se ha registrado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
