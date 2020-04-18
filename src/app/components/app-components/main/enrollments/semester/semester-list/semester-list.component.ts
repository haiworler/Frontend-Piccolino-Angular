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
import { SemesterService } from '@services/app-services/schools/semester.service';
import { SemesterCreateComponent } from '../semester-create/semester-create.component';
import { SemesterUpdateComponent } from '../semester-update/semester-update.component';


@Component({
	selector: 'app-semester-list',
	templateUrl: './semester-list.component.html',
	styles: []
})
export class SemesterListComponent implements OnInit,OnDestroy {

	heading = 'Listado de semestres';
	subheading = 'Listado';
	icon = 'fa fa-th-list icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	semesterListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	semester: any;
	semesters: any;

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _semesterService: SemesterService,
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
		this.semesterListForm = this.formBuilder.group({
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
				this.searchsemesters();
			}
		});

		this.ngOnChanges();
	}


	ngOnChanges() {
		this.semesterListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.semesterListForm.get('term');
	}

	get page() {
		return this.semesterListForm.get('page');
	}

	get limit() {
		return this.semesterListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchsemesters().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.semesterListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.semesters = [];
		this.search();
	}

	async searchsemesters() {
		this.semesters = [];
		this.loadControl = 0;
		return await this._semesterService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.semesters = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatesemester(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatesemesterState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente semesterCreateComponent
	   */
	createsemesterModal = () => {
		this._modalService.open({
			component: SemesterCreateComponent,
			title: 'Registro de un nuevo semestre',
			size: 'modal-xl'
		});
	}


	updatesemester = (semester: any) => {
		this._semesterService.setsemester(semester);
		this._modalService.open({
			component: SemesterUpdateComponent,
			title: 'Actualización de un semestre',
			size: 'modal-xl'
		});
	}

	updatesemesterState = (semester: any) => {
		semester.enabled = (semester.enabled) ? 0 : 1;
		this._semesterService.update(semester.id, semester).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El semestre se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
