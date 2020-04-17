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
import { StudentNoteComponent } from '../student-note/student-note.component';


@Component({
	selector: 'app-note-create',
	templateUrl: './note-create.component.html',
	styles: []
})
export class NoteCreateComponent implements OnInit {

	noteCreateForm: FormGroup;

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

	async ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('user'));
		this.noteCreateForm = this.formBuilder.group({
			basic_data: this.formBuilder.group({
				note: [null, [Validators.required]],
				subject: [null, [Validators.required]],
				subject_name: null,
				observations: null,
				group: [null, [Validators.required]],
				group_name: null,
				enrolled: [null, [Validators.required]],
				people: null,
				semester: [null, [Validators.required]],
				cut: [null, [Validators.required]],
			})
		});

		this.dependences = await this._noteService.dependences();
		this.semesters = this.dependences.semesters.map((obj: any) => { return { id: obj.id, name: obj.code, cuts: obj.cuts }; });
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
		this.noteCreateForm.valueChanges.subscribe((form: any) => {
			if (form.basic_data.semester) {
				this.cuts = form.basic_data.semester.cuts
			}
			if (form.basic_data.semester && form.basic_data.cut && form.basic_data.subject && form.basic_data.group) {
				this.getPeopleGroupNote();
			}
			else {
				this.enrolleds = [];
			}
		});

	}

	get basicData() {
		return this.noteCreateForm.get('basic_data');
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
		this.enrolleds = response;
	}
	

	/**
	   * Abre el modal seteando el componente StudentNoteComponent
	   */
	  createStudentNoteComponentModal = (enrolled:any) => {
		  this._noteService.setnote({cut:this.basicData.get('cut').value, subject:this.basicData.get('subject').value, semester: this.basicData.get('semester').value, group: this.basicData.get('group').value, enrolled: enrolled});
		 // console.log('Aqui la matrícula: ', enrolled);
		this._modalService.open({
			component: StudentNoteComponent,
			title: '',
			size: 'modal-xl'
		});
	}






	createnote = () => {
		const basicData: any = (this.basicData as FormGroup).getRawValue();
		const data = {
			name: basicData.name,
			code: basicData.code,
			observations: basicData.observations,
			credits: basicData.credits,
		}
		this._noteService.create(data).then((response: any) => {
			this.progress = 1;
			this._storageService.setItem('token', localStorage.getItem('token'));
			this._modalService.close();
			this._notificationService.success({
				title: 'Información',
				message: 'La caliicación se ha registrado correctamente.'
			});
		}).catch((response: any) => {
			this.progress = false;
		});
	}



}
