import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs/operators';

/**
 * 
 */
import { NoteService } from '@services/app-services/schools/note.service';
import { AssistanceService } from '@services/app-services/assistances/assistance.service';


@Component({
  selector: 'app-assistance-register',
  templateUrl: './assistance-register.component.html',
  styles: [
  ]
})
export class AssistanceRegisterComponent implements OnInit,OnDestroy {

  assistanceRegisterForm: FormGroup;

  userData: any;
  countryID: number;

  progress: boolean | number = false;
  dependences: any = [];
  semesters: any = [];
  groups: any = [];
  subjects: any = [];
  cuts: any = [];
	storageSub: any = null;
	loadControl: any = 0;

  days: any = [];
  hours: any = [];

  studen: any = [];
  students: any = [];

   marked: boolean | number = false;
  changes: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _noteService: NoteService,
    public calendar: NgbCalendar,
    private _assistanceService: AssistanceService,

  ) { }

  async ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.assistanceRegisterForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        date: [null, [Validators.required]],
        subject: [null, [Validators.required]],
        subject_name: null,
        observations: null,
        group: [null, [Validators.required]],
        group_name: null,
        people: null,
        semester: [null, [Validators.required]],
        cut: [null, [Validators.required]],
        hour: [null, [Validators.required]]

      }),
      array_students: this.formBuilder.array([]),

    });
    this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
		
		});
    this.dependences = await this._assistanceService.dependences();
    this.semesters = this.dependences.semesters.map((obj: any) => { return { id: obj.id, name: obj.code, cuts: obj.cuts }; });
    this.hours = this.dependences.hours;
    this._noteService.getRegister().subscribe(value => {
      if (value) {
        this.getPeopleGroupNote();
      }
    });
    this.ngOnChanges();
  }
  /**
* Observo lo que pase en e formulario
*/
  ngOnChanges() {
    this.assistanceRegisterForm.valueChanges.subscribe((form: any) => {
      if (form.basic_data.semester) {
        this.cuts = form.basic_data.semester.cuts
      }
      if (form.basic_data.semester && form.basic_data.cut && form.basic_data.subject && form.basic_data.group && (this.arrayStudents as FormGroup).getRawValue().length == 0) {
        this.getPeopleGroupNote();
      }
     
    });

  }

  reset = () => {
		this.assistanceRegisterForm.reset();
		this.students = [];
    (this.arrayStudents as FormArray).clear();


	}

  get basicData() {
    return this.assistanceRegisterForm.get('basic_data');
  }

  /**
   * Permite obtener los datos del formulario de la posición rates
   */
   get arrayStudents() {
    return this.assistanceRegisterForm.get('array_students');
  }

  async getGroupTeacher(semester: any) {
    this.basicData.patchValue({ group: null });
    this.basicData.patchValue({ subject: null });
    this.basicData.patchValue({ cut: null });
    let people: any = this.userData.people[0];
    let data = {
      semester_id: semester.id,
      people_id: people.id
    }
    let response = await this._noteService.getGroupTeacher(data);
    this.groups = response;
  }

  async getSubjectTeacher(group: any) {
    this.basicData.patchValue({ subject: null });
    let people: any = this.userData.people[0];
    let data = {
      semester_id: this.basicData.get('semester').value.id,
      people_id: people.id,
      group_id: group.id
    }
    let response = await this._noteService.getSubjectTeacher(data);
    this.subjects = response;
  }

  async getPeopleGroupNote() {
    let data = {
      semester_id: this.basicData.get('semester').value.id,
      group_id: this.basicData.get('group').value.id,
      cut_id: this.basicData.get('cut').value.id,
      subject_id: this.basicData.get('subject').value.id,
    }
    let response = await this._noteService.getPeopleGroupNote(data);
    this.createArrayStudent(response);
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
     * Abre el modal seteando el componente StudentNoteComponent
     */
  createStudentNoteComponentModal = (enrolled: any) => {
    this._noteService.setnote({ cut: this.basicData.get('cut').value, subject: this.basicData.get('subject').value, semester: this.basicData.get('semester').value, group: this.basicData.get('group').value, enrolled: enrolled });
    // console.log('Aqui la matrícula: ', enrolled);
    this._modalService.open({
      //component: StudentNoteComponent,
      title: '',
      size: 'modal-xl'
    });
  }






  registerAssistance = () => {
    const arrayStudents: any = (this.arrayStudents as FormGroup).getRawValue();

    const basicData: any = (this.basicData as FormGroup).getRawValue();
     const data = {
      group_id: basicData.group.id,
      subject_id: basicData.subject.id,
      semester_id: basicData.semester.id,
      cut_id: basicData.cut.id,
      date: basicData.date,
      hour_id: basicData.hour.id,
      arrayStudents: arrayStudents
     }
     this._assistanceService.create(data).then((response: any) => {
       this.progress = false;
       this._storageService.setItem('token', localStorage.getItem('token'));
       //this._modalService.close();
       this._notificationService.success({
         title: 'Información',
         message: 'La asistencia se ha registrado correctamente.'
       });
       this.reset();
     }).catch((response: any) => {
       console.log('Hola Ingreso aqui');
       this.progress = false;
     });
  }

  ngOnDestroy() {
		this.storageSub.unsubscribe();
	}
}
