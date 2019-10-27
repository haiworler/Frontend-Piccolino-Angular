import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { PersonService } from '@services/app-services/person.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person-update',
  templateUrl: './person-update.component.html',
  styles: []
})
export class PersonUpdateComponent implements OnInit {

  personUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  neighbourhood: any;
  person: any;
  documentTypes: any = [];
  genders: any = [];
  cities: any = [];
  neighbourhoods: any = [];
  personTypes: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _personService: PersonService,
    public calendar: NgbCalendar
  ) { }

  async ngOnInit() {

    this.userData = this._mainService.getUserData();
    this.person = this._personService.getPerson();
    console.log('Persona: ', this.person);
    this.personUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        names: ['', [Validators.required]],
        surnames: ['', [Validators.required]],
        DocumentType: ['', [Validators.required]],
        documentNumber: ['', [Validators.required]],
        birthDate: [this.calendar.getToday(), [Validators.required]],
        City: ['', [Validators.required]],
        Gender: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        cell: ['', [Validators.required]],
        email: ['', [Validators.required]],
        addressResidence: ['', [Validators.required]],
        Neighbourhood: ['', [Validators.required]],
        occupation: ['', [Validators.required]],
        rh: ['', [Validators.required]],
        eps: ['', [Validators.required]],
        observations: ['', [Validators.required]],
        stratum: ['', [Validators.required]],
        levelSisben: ['', [Validators.required]],
        state: [1, [Validators.required]],
        meansContact: ['', [Validators.required]],
        image: [[]],
        PersonType: ['', [Validators.required]]
      })
    });
    this.basicData.patchValue(this.person);
    this.basicData.get('birthDate').setValue(this.formatDatepiker(this.person.birthDate));

    this.documentTypes = await this._personService.getDependence('document-type');
    this.genders = await this._personService.getDependence('genders');
    this.cities = await this._personService.getDependence('cities');
    this.neighbourhoods = await this._personService.getDependence('neighbourhood');
    this.personTypes = await this._personService.getDependence('type-person');
  }

  get basicData() {
    return this.personUpdateForm.get('basic_data');
  }

  assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
  addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
  formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);


  updatePerson = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const data = {
      names: basicData.names,
      surnames: basicData.surnames,
      documentTypeId: basicData.DocumentType.id,
      documentNumber: basicData.documentNumber,
      birthDate: this.formatJsonDate(basicData.birthDate),
      cityId: basicData.City.id,
      genderId: basicData.Gender.id,
      phone: basicData.phone,
      cell: basicData.cell,
      email: basicData.email,
      addressResidence: basicData.addressResidence,
      neighborhoodId: basicData.Neighbourhood.id,
      occupation: basicData.occupation,
      rh: basicData.rh,
      eps: basicData.eps,
      observations: basicData.observations,
      stratum: basicData.stratum,
      levelSisben: basicData.levelSisben,
      state: basicData.state,
      meansContact: basicData.meansContact,
      personType: basicData.PersonType.id //,
      //image: ((basicData.image.length > 0) ? basicData.image[0].file.name : '')
    }
    this._personService.update(this.person.id,data).then((response: any) => {
       this.progress = 1;
       this._storageService.setItem('token', localStorage.getItem('token'));
       this._modalService.close();
       this._notificationService.success({
         title: 'Información',
         message: 'La Persona se ha actualizado correctamente.'
       });
     }).catch((response: any) => {
       this.progress = false;
     });
  }

   /**
   * Toma la fecha y la transforma en formato NgDAtepiker
   */

	formatDatepiker(dateString: string) {
		let date = new Date(dateString);
		return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
	}

}
