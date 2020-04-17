import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
/**
 * 
 */

import { NoteService } from '@services/app-services/schools/note.service';

@Component({
  selector: 'app-student-note',
  templateUrl: './student-note.component.html',
  styles: []
})
export class StudentNoteComponent implements OnInit,OnDestroy {

  studentNoteCreateForm: FormGroup;

  userData: any;
  countryID: number;

  progress: boolean | number = false;
  note: any;
  dependences: any = [];
  semesters: any = [];
  groups: any = [];
  subjects: any = [];
  cuts: any = [];
  enrolleds: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private _mainService: MainService,
    private _storageService: StorageService,
    private _modalService: ModalService,
    private _notificationService: NotificationsService,
    private _noteService: NoteService,
    public calendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.note = this._noteService.getnote();
    this.studentNoteCreateForm = this.formBuilder.group({
      basic_data: this.formBuilder.group({
        note: [null, [Validators.required]],
        subject: [null, [Validators.required]],
        subject_name: null,
        observations: null,
        group: [null, [Validators.required]],
        group_name: null,
        semester: [null, [Validators.required]],
        cut: [null, [Validators.required]],
        names: null,
        surnames: null,
        identification: null
      })
    });
    this.basicData.patchValue(this.note);
    this.basicData.get('names').setValue(this.note.enrolled.people.names);
    this.basicData.get('surnames').setValue(this.note.enrolled.people.surnames);
    this.basicData.get('identification').setValue(this.note.enrolled.people.document_number);
    this.basicData.get('subject').disable();
    this.basicData.get('group').disable();
    this.basicData.get('semester').disable();
    this.basicData.get('cut').disable();
    this.basicData.get('names').disable();
    this.basicData.get('surnames').disable();
    this.basicData.get('identification').disable();



  }

  get basicData() {
    return this.studentNoteCreateForm.get('basic_data');
  }

  createnote = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    let competencies = basicData.subject.competencies.map((obj: any) => { return { note: this.noteRaund(basicData.note), observations: 'Hiciste un gran trabajo, con el tiempo se vera reflejados.', competencie_name: obj.name } });
    if (basicData.note > 5) {
      this._notificationService.warning({
        title: 'Información',
        message: 'La calificación no puede ser mayor a 5'
      });
    } else {
      const data = {
        note: basicData.note,
        observations: basicData.observations,
        subject_id: basicData.subject.id,
        subject_name: basicData.subject.name,
        group_id: basicData.group.id,
        group_name: basicData.group.name,
        enrolled_id: this.note.enrolled.id,
        people_id: this.note.enrolled.people.id,
        semester_id: basicData.semester.id,
        cut_id: basicData.cut.id,
        competencies: competencies
      }
      this._noteService.create(data).then((response: any) => {
        this.progress = 1;
        this._storageService.setItem('token', localStorage.getItem('token'));
        this._noteService.setRegister(1);
        this._modalService.close();
        this._notificationService.success({
          title: 'Información',
          message: 'la calificación se ha registrado correctamente.'
        });
      }).catch((response: any) => {
        this.progress = false;
      });

    }
  }


  noteRaund(note: any) {
    let min = 0;
    let max = 5;
    if (note < 3) {
      min = 2.5;
      max = 2.9;
    }
    if (note >= 3) {
      min = note;
      max = 4;
    }
    if (note >= 4) {
      min = 3.5;
      max = 4.4;
    }
    if (note == 5) {
      min = 4.2;
      max = 4.9;
    }
    let value = this.randomPrecision(min, max, 2);
    if (value > 5) {
      value = Math.random() * (max - min) + min;
    }
    return value;
  }

  randomPrecision(lo, hi, prec) {
    prec = Math.floor(Math.random() * (prec + 1));
    return Number((lo + Math.random() * (hi - lo + 1)).toFixed(prec));
  }

  ngOnDestroy() {
		this._noteService.setRegister(0);
	}

}
