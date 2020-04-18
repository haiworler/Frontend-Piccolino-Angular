import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

/**
 * 
 */
import { PeopleService } from '@services/app-services/people/people.service';
import { StudentCreateComponent } from '../student-create/student-create.component';
import { StudentUpdateComponent } from '../student-update/student-update.component';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styles: []
})
export class StudentListComponent implements OnInit,OnDestroy {

	heading = 'Listado de estudiantes';
	subheading = 'Listado';
	icon = 'fa fa-user icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	peopleListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	people: any;
	peoples: any;


	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _peopleService: PeopleService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit() {
		/**
	 * Indica los permisos que sse van  a utilizar
	 */
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if (this.permissions[permission].method != 'delete') {
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

		/**
			 * 
			 */
		this.peopleListForm = this.formBuilder.group({
			term: ['', []],
			page: [1, []],
			limit: [10, []],
			type_people: 1
		});

		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value,
			type_people: 1
		};

		this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
			if (token) {
				this.searchpeoples();
			}
		});

		this.ngOnChanges();
	}

	ngOnChanges() {
		this.peopleListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit,
				type_people: 1
			};
		});

	}

	get term() {
		return this.peopleListForm.get('term');
	}

	get page() {
		return this.peopleListForm.get('page');
	}

	get limit() {
		return this.peopleListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchpeoples().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.peopleListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.peoples = [];
		this.search();
	}

	async searchpeoples() {
		this.peoples = [];
		this.loadControl = 0;
		return await this._peopleService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			console.log('response:', response);
			this.peoples = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatePeople(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatePeopleState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente peopleCreateComponent
	   */
	createPeopleModal = () => {
		this._modalService.open({
			component: StudentCreateComponent,
			title: 'Registro de un nuevo estudiante',
			size: 'modal-xl'
		});
	}


	updatePeople = (people: any) => {
		this._peopleService.setpeople(people);
		this._modalService.open({
			component: StudentUpdateComponent,
			title: 'Actualización de un estudiante',
			size: 'modal-xl'
		});
	}

	updatePeopleState = (people: any) => {
		people.enabled = (people.enabled) ? 0 : 1;
		this._peopleService.update(people.id, people).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El estudiante se ha actualizado correctamente.'
			});
		});

	}


	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
