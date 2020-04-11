import { Component, OnInit } from '@angular/core';
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
import { VoluntaryCreateComponent } from '../voluntary-create/voluntary-create.component';
import { VoluntaryUpdateComponent } from '../voluntary-update/voluntary-update.component';




@Component({
  selector: 'app-voluntary-list',
  templateUrl: './voluntary-list.component.html',
  styles: []
})
export class VoluntaryListComponent implements OnInit {

  heading = 'Listado de voluntarios';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
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
			type_people: 2
		});

		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value,
			type_people: 2
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
				type_people: 2
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
			component: VoluntaryCreateComponent,
			title: 'Registro de un nuevo voluntario',
			size: 'modal-xl'
		});
	}


	updatePeople = (people: any) => {
		this._peopleService.setpeople(people);
		this._modalService.open({
			component: VoluntaryUpdateComponent,
			title: 'Actualización de un voluntario',
			size: 'modal-xl'
		});
	}

	updatePeopleState = (people: any) => {
		people.enabled = (people.enabled) ? 0 : 1;
		this._peopleService.update(people.id, people).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El voluntario se ha actualizado correctamente.'
			});
		});

	}


}
