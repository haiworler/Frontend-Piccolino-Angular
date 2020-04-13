import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
/**
 * Creados
 */
import { GroupService } from '@services/app-services/schools/group.service';
import { GroupCreateComponent } from '../group-create/group-create.component';
import { GroupUpdateComponent } from '../group-update/group-update.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styles: []
})
export class GroupListComponent implements OnInit,OnDestroy {

  heading = 'Listado de grupos';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	groupListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	group: any;
	groups: any;


  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _groupService: GroupService,
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
		this.buttonsOp.push(
			{ name: 'add', title: 'Alumnos', secondTitle: null, icon: 'fa fa-users fa-fw mr-2', method: 'add', class: 'btn btn-sm btn-pill btn-outline-primary', condition: null, parameter: null, specialCondition: false }
		);
		this.buttonsOp.push(
			{ name: 'subject-assign', title: 'Asignaturas', secondTitle: null, icon: 'fa fa-book fa-fw mr-2', method: 'subject-assign', class: 'btn btn-sm btn-pill btn-outline-alternate', condition: null, parameter: null, specialCondition: false }
		);

		/**
			 * 
			 */
		this.groupListForm = this.formBuilder.group({
			term: ['', []],
			page: [1, []],
			limit: [10, []]
		});

		this.searchData = {
			term: this.term.value,
			page: this.page.value,
			limit: this.limit.value
		};

		this.storageSub = this._storageService.watch().pipe(debounceTime(500)).subscribe((token: any) => {
			if (token) {
				this.searchgroups();
			}
		});

		this.ngOnChanges();
  }

  ngOnChanges() {
		this.groupListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.groupListForm.get('term');
	}

	get page() {
		return this.groupListForm.get('page');
	}

	get limit() {
		return this.groupListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchgroups().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.groupListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.groups = [];
		this.search();
	}

	async searchgroups() {
		this.groups = [];
		this.loadControl = 0;
		return await this._groupService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			console.log('response: ', response);
			this.groups = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updategroup(parameters.object);
				break;
			case 'activate-deactivate':
				this.updategroupState(parameters.object);
				break;
				case 'add':
				this.students(parameters.object);
				break;
				case 'subject-assign':
				this.subjects(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente groupCreateComponent
	   */
	creategroupModal = () => {
		this._modalService.open({
			component: GroupCreateComponent,
			title: 'Registro de un nuevo grupo',
			size: 'modal-xl'
		});
	}


	updategroup = (group: any) => {
		this._groupService.setgroup(group);
		this._modalService.open({
			component: GroupUpdateComponent,
			title: 'Actualización de un grupo',
			size: 'modal-xl'
		});
	}

	students = (group: any) => {
		this._groupService.setgroup(group);
		this._modalService.open({
			component: StudentListComponent,
			title: 'Listado de estudiantes',
			size: 'modal-xl'
		});
	}

	subjects = (group: any) => {
		this._groupService.setgroup(group);
		this._modalService.open({
			component: SubjectListComponent,
			title: 'Listado de asignaturas',
			size: 'modal-xl'
		});
	}

	updategroupState = (group: any) => {
		group.enabled = (group.enabled) ? 0 : 1;
		this._groupService.update(group.id, group).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El grupo se ha actualizado correctamente.'
			});
		});
	}


	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
