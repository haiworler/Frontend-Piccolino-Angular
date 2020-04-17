import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MainService } from '@services/app-services/main.service';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

/**
 * 
 */

import { NoteService } from '@services/app-services/schools/note.service';
import { StudentNoteUpdateComponent } from '../student-note-update/student-note-update.component';


@Component({
	selector: 'app-note-update',
	templateUrl: './note-update.component.html',
	styles: []
})
export class NoteUpdateComponent implements OnInit, OnDestroy {

	noteUpdateForm: FormGroup;

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
	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;


	constructor(
		private formBuilder: FormBuilder,
		private _mainService: MainService,
		private _storageService: StorageService,
		private _modalService: ModalService,
		private _notificationService: NotificationsService,
		private _noteService: NoteService,
		public calendar: NgbCalendar,
		private router: Router
	) { }

	async ngOnInit() {
		this.userData = JSON.parse(localStorage.getItem('user'));
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if (this.permissions[permission].method != 'activate-deactivate') {
				this.buttonsOp.push(
					{
						title: this.permissions[permission].title,
						secondTitle: this.permissions[permission].secondTitle,
						icon: this.permissions[permission].icon,
						method: this.permissions[permission].method,
						class: this.permissions[permission].class,
						condition: this.permissions[permission].condition,
						parameter: null,
					}
				);
			}
		}
		this.noteUpdateForm = this.formBuilder.group({
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
		this.noteUpdateForm.valueChanges.subscribe((form: any) => {
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
		return this.noteUpdateForm.get('basic_data');
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
		let response = await this._noteService.getPeopleGroupNoteUpdate(data);
		console.log('data: List: ', response);
		this.enrolleds = response;
	}


	/**
	   * Abre el modal seteando el componente StudentNoteComponent
	   */
	createStudentNoteComponentModal = (enrolled: any) => {
		this._noteService.setnote({
			cut: this.basicData.get('cut').value, subject: this.basicData.get('subject').value, semester: this.basicData.get('semester').value, group: this.basicData.get('group').value, enrolled: enrolled,
			note: enrolled.notes.filter((obj: any) => { if (obj.subject_id == this.basicData.get('subject').value.id) { return obj; } })
		});
		this._modalService.open({
			component: StudentNoteUpdateComponent,
			title: '',
			size: 'modal-xl'
		});
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.createStudentNoteComponentModal(parameters.object);
				break;
			case 'delete':
				this.delete(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
* Elimina el Objeto, para este proceso en el backend se debe utilizar el softDelete
* para que el registro no se pierda realmente.....
*/
	delete = (enrolled: any) => {
		console.log('Obhero: ', enrolled);
		swal.fire({
			title: '¿ Esta seguro(a) ?',
			text: '¿ De eliminar la calificación ?',
			type: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si',
			cancelButtonText: 'No'
		}).then((result) => {
			if (result.value) {
				let notes = enrolled.notes.filter((obj: any) => { if (obj.subject_id == this.basicData.get('subject').value.id) { return obj; } })
				console.log('Notes: ', notes);
				this._noteService.delete(enrolled.notes[0].id).then((response: any) => {
					this.getPeopleGroupNote();
					this._notificationService.success({
						title: 'Información',
						message: 'La calificación se ha eliminada correctamente.'
					});
				});
			}
		});
	}







	ngOnDestroy() {
		this._noteService.setRegister(0);
	}

}
