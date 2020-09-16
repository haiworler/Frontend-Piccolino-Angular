import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl,FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FORM_REGEX } from '../../../../../../global/form-regex';

import { PeopleService } from '@services/app-services/people/people.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styles: []
})
export class StudentUpdateComponent implements OnInit {

  studentUpdateForm: FormGroup;
  userData: any;
  progress: boolean | number = false;
  student: any;

  typePeoples: any[] = [];
  dependences: any = [];

  contactTypes:any = [];
  categoryDocuments:any = [];
  trainingTypes:any = [];

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
    this.student = this._peopleService.getpeople();
    this.studentUpdateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        imagen: [[]],
        names: ['', [Validators.required]],
        surnames: ['', [Validators.required]],
        type_document: [[], [Validators.required]],
        document_number: ['', [Validators.required]],
        birth_date: [null, [Validators.required]],
        town: [[], [Validators.required]],
        gender: [[], [Validators.required]],
        phone: null,
        cell: null,
        email: ['', [Validators.pattern(`${FORM_REGEX.email}`)]],
        address_residence: ['', [Validators.required]],
        neighborhood: [[], [Validators.required]],
        occupation: [[], [Validators.required]],
        arrival_date: this.calendar.getToday()

      }),
      additional_data: this.formBuilder.group({
        rh: null,
        eps: null,
        observations: null,
        stratum: null,
        level_sisben: null,
        type_people: ['', [Validators.required]],
        date_role_change: ['' , [Validators.required]],
        promotion: null,
        history: null,
      }),
      contacts_data: this.formBuilder.array([]),
      documents_data: this.formBuilder.array([]),
      academic_informations_data: this.formBuilder.array([])
    });

    this.dependences = await this._peopleService.dependences();
    this.contactTypes = this.dependences.contactTypes;
    this.categoryDocuments = this.dependences.categoryDocuments;
    this.trainingTypes = this.dependences.trainingTypes;
    console.log('this.dependences:',this.dependences);
    this.typePeoples = this.dependences.typePeoples.filter((data: any) => {
      if (data.id == 1 || data.id == 2 || data.id == 3 ) {
        return data;
      }
    });

    // Setea los valores
		this.basicData.patchValue(this.student);
    this.additionalData.patchValue(this.student);
    this.basicData.get('birth_date').setValue({ year: parseInt(this.student.birth_date.substr(0, 4)), month: parseInt(this.student.birth_date.substr(5, 2)), day: parseInt(this.student.birth_date.substr(8, 2)) });
    if (this.student.imagen && this.student.imagen != 'null') {
      this.basicData.get('imagen').setValue([{ preview: `${environment.ServerUrl}storage/people/images/${((this.student.imagen && this.student.imagen != 'null') ? this.student.imagen : '')}` }]);
    }
    if (this.student.arrival_date	 && this.student.arrival_date != 'null') {
      this.basicData.get('arrival_date').setValue({ year: parseInt(this.student.arrival_date.substr(0, 4)), month: parseInt(this.student.arrival_date.substr(5, 2)), day: parseInt(this.student.arrival_date.substr(8, 2)) });

    }

  // Se crean los conctactos registrados
    this.student.contacts.forEach((contact:any) => {
      (this.contactsData as FormArray).push(
        this.formBuilder.group({
          id: contact.id,
          contact_type_id: [contact.contact_type, [Validators.required]],
          names: [contact.names, [Validators.required]],
          surnames: [contact.surnames, [Validators.required]],
          phone: contact.phone,
          cell: contact.cell,
          description: contact.description,
          state: true
        })
      );
    });
    // Se crean los documentos registrados
    this.student.documents.forEach((document:any) => {
      (this.documentsData as FormArray).push(
        this.formBuilder.group({
          id: document.id,
          category_document_id: [document.category_document, [Validators.required]],
          institution_name: [document.institution_name, [Validators.required]],
          name: [document.name, [Validators.required]],
          expedition_date: document.expedition_date,
          route: document.route,
          observations: document.observations,
          state:true
        })
      );
    });
    // Se crea la información academica registrada
    this.student.academic_informations.forEach((academic:any) => {
      (this.academicInformationsData as FormArray).push(
        this.formBuilder.group({
          id: academic.id,
          training_type_id: [academic.training_type, [Validators.required]],
          institution_name: [academic.institution_name, [Validators.required]],
          name: [academic.name, [Validators.required]],
          date: academic.date,
          route: academic.route,
          observations: academic.observations,
          state:true
        })
      ); 
    });


  }

  get basicData() {
    return this.studentUpdateForm.get('basic_data');
  }

  get additionalData() {
    return this.studentUpdateForm.get('additional_data');
  }
  get contactsData() {
    return this.studentUpdateForm.get('contacts_data');
  }
  get documentsData() {
    return this.studentUpdateForm.get('documents_data');
  }
  get academicInformationsData() {
    return this.studentUpdateForm.get('academic_informations_data');
  }

  createContact = () => {
    (this.contactsData as FormArray).push(
      this.formBuilder.group({
        id: null,
        contact_type_id: ['', [Validators.required]],
        names: ['', [Validators.required]],
        surnames: ['', [Validators.required]],
        phone: null,
        cell: null,
        description: null,
        state: true
      })
    );
  }

  removeContact = (event: any, Index: number) => {
    event.preventDefault();
    let objArray: any = (this.contactsData as FormArray).at(Index).value;
    if (objArray.id) {
      (this.contactsData as FormArray).at(Index).get('state').setValue(false);

    } else {
      (this.contactsData as FormArray).removeAt(Index);
    }
  }

  createDocument = () => {
    (this.documentsData as FormArray).push(
      this.formBuilder.group({
        id: null,
        category_document_id: ['', [Validators.required]],
        institution_name: ['', [Validators.required]],
        name: ['', [Validators.required]],
        expedition_date: '',
        route: '',
        observations: '',
        state:true
      })
    );
  }
  removeDocument = (event: any, Index: number) => {
    event.preventDefault();
    let objArray: any = (this.documentsData as FormArray).at(Index).value;
    if (objArray.id) {
      (this.documentsData as FormArray).at(Index).get('state').setValue(false);

    } else {
      (this.documentsData as FormArray).removeAt(Index);
    }
  }

  createAcademicInformation = () => {
    (this.academicInformationsData as FormArray).push(
      this.formBuilder.group({
        id: null,
        training_type_id: ['', [Validators.required]],
        institution_name: ['', [Validators.required]],
        name: ['', [Validators.required]],
        date: '',
        route: '',
        observations: '',
        state:true
      })
    );
  }
  removeacAdemicInformation = (event: any, Index: number) => {
    event.preventDefault();
    let objArray: any = (this.academicInformationsData as FormArray).at(Index).value;
    if (objArray.id) {
      (this.academicInformationsData as FormArray).at(Index).get('state').setValue(false);

    } else {
      (this.academicInformationsData as FormArray).removeAt(Index);
    }
  }



  /**
	* Toma la fecha y la transforma en formato NgDAtepiker
	*/

	formatDatepiker(dateString: string) {
		let date = new Date(dateString);
		return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
	}

  assignTodayDate = (control: FormControl) => control.setValue(this.calendar.getToday());
  addLeadingZeroes = (number: number) => (number < 10 ? `0${number}` : number);
  formatJsonDate = (date: any) => (`${date.year}-${this.addLeadingZeroes(date.month)}-${this.addLeadingZeroes(date.day)}`);
  /**
   * Valida la fecha de asignacio del rol
   * @param type_people 
   */
  validateDateRole(type_people){
    if (type_people.value) {
      if(type_people.value.id == 2){
        this.additionalData.get('promotion').setValidators([Validators.required]);
      }else{
        this.additionalData.get('promotion').clearValidators();
      }
    }
    this.additionalData.get('promotion').updateValueAndValidity();
    this.additionalData.get('date_role_change').setValue('');
  }

  updateStudent = () => {
    let user:any = JSON.parse(localStorage.getItem('user'));
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const additionalData: any = (this.additionalData as FormGroup).getRawValue();
		let contactsData: any = (this.contactsData as FormGroup).getRawValue();
    let documentsData: any = (this.documentsData as FormArray).getRawValue();
    let academicInformationsData: any = (this.academicInformationsData as FormArray).getRawValue();

    const data = {
      people: { names: basicData.names,
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
       date_role_change: additionalData.date_role_change,
       promotion: additionalData.promotion,
       history: additionalData.history,
       arrival_date: ((basicData.arrival_date) ? this.formatJsonDate(basicData.arrival_date): ''),
       user_updated_at: user.id,
      },
      imagen: ((basicData.imagen.length) ? ((basicData.imagen[0].file != undefined) ? { imagen: basicData.imagen[0].preview, name: basicData.imagen[0].file.name, size: basicData.imagen[0].file.size, type: basicData.imagen[0].file.type } : 'N/A' ) : ''),
      contacts: contactsData,
      documents: documentsData,
      academicInformations:academicInformationsData
     }
    this._peopleService.update(this.student.id,data).then((response: any) => {
      this.progress = 1;
      this._storageService.setItem('token', localStorage.getItem('token'));
      this._modalService.close();
      this._notificationService.success({
        title: 'Información',
        message: 'El estudiante se ha actualizado correctamente.'
      });
    }).catch((response: any) => {
      this.progress = false;
    });
  }

}
