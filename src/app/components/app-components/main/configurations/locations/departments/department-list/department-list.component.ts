import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
/**
 * Creados
 */
import { DepartmentService } from '@services/app-services/configurations/locations/department.service';
import { DepartmentCreateComponent } from '../department-create/department-create.component';
import { DepartmentUpdateComponent } from '../department-update/department-update.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styles: [
  ]
})
export class DepartmentListComponent implements OnInit,OnDestroy {

  heading = 'Departamentos';
	subheading = 'Listado';
	icon = 'fa fa-road icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	departmentListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	department: any = [];
	departments: any = [];

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _departmentService: DepartmentService,
		private _mainService: MainService,
		private router: Router
  ) { }

  ngOnInit(): void {
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
		this.departmentListForm = this.formBuilder.group({
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
				this.searchdepartments();
			}
		});

		this.ngOnChanges();
  }



	ngOnChanges() {
		this.departmentListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.departmentListForm.get('term');
	}

	get page() {
		return this.departmentListForm.get('page');
	}

	get limit() {
		return this.departmentListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchdepartments().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.departmentListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.departments = [];
		this.search();
	}

	async searchdepartments() {
		this.departments = [];
		this.loadControl = 0;
		return await this._departmentService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.departments = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.update(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente cutCreateComponent
	   */
	createModal = () => {
		this._modalService.open({
			component: DepartmentCreateComponent,
			title: 'Registro de un nuevo departamento',
			size: 'modal-xl'
		});
	}


	update = (department: any) => {
		this._departmentService.setDepartment(department);
		this._modalService.open({
			component: DepartmentUpdateComponent,
			title: 'Actualización de un departamento',
			size: 'modal-xl'
		});
	}

	updateState = (department: any) => {
		department.enabled = (department.enabled) ? 0 : 1;
		this._departmentService.update(department.id, department).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El departamento se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
