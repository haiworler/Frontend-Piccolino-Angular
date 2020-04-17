import { Component, OnInit } from '@angular/core';
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
  selector: 'app-student-note-update',
  templateUrl: './student-note-update.component.html',
  styles: []
})
export class StudentNoteUpdateComponent implements OnInit {

  studentNoteUpdateForm: FormGroup;

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
    console.log('Nora: ', this.note);
    this.studentNoteUpdateForm = this.formBuilder.group({
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
      }),
      competencies: this.formBuilder.array([])
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
    this.basicData.get('note').setValue(this.note.note[0].note);
    this.basicData.get('observations').setValue(this.note.note[0].observations);
    this.createUpdateCompetencie(this.note.note[0].note_competitions);



  }

  get basicData() {
    return this.studentNoteUpdateForm.get('basic_data');
  }

  get competencies() {
    return this.studentNoteUpdateForm.get('competencies');
  }

  createUpdateCompetencie = (competencies: any[]) => {
    if (competencies.length) {
      competencies.forEach((element: any) => {
        (this.competencies as FormArray).push(
          this.formBuilder.group({
            id: element.id,
            note: [element.note, [Validators.required]],
            observations: element.observations,
            name: element.competencie_name
          })
        );
      }
      );
    }
  }

  createnote = () => {
    const basicData: any = (this.basicData as FormGroup).getRawValue();
    const competencies: any = (this.competencies as FormArray).getRawValue();
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
      this._noteService.update(this.note.note[0].id,data).then((response: any) => {
        this.progress = 1;
        this._storageService.setItem('token', localStorage.getItem('token'));
        this._noteService.setRegister(1);
        this._modalService.close();
        this._notificationService.success({
          title: 'Información',
          message: 'La calificación se ha registrado correctamente.'
        });
      }).catch((response: any) => {
        this.progress = false;
      });

    }
  }





}
