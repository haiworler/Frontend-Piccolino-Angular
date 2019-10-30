import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { StorageService } from '@services/app-services/storage.service';
import { ModalService } from '@services/shared/modal.service';
import { SubjectService } from '@services/app-services/subject.service';
import { NotificationsService } from '@services/shared/notifications.service';
import { Headquarter } from '@interfaces/headquarter';
import { MainService } from '@services/app-services/main.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SubjectCreateComponent } from './../subject-create/subject-create.component';



@Component({
	selector: 'app-subject-list',
	templateUrl: './subject-list.component.html',
	styles: []
})
export class SubjectListComponent implements OnInit,OnChanges, OnDestroy {

	heading = 'Asignaturas';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	storageSub: any = null;
	subject: any;
	searchData: any;
	progressSearch: boolean | number = false;
	subjectsListForm: FormGroup;
	loadControl: any = 0;
	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	subjects:any = [];

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _subjectService: SubjectService,
		private _mainService: MainService,
		private router: Router
	) { }

	ngOnInit() {
		this.userData = this._mainService.getUserData();
		this.permissions = this._mainService.Permissions;
		this.currentRoute = this.router.url;
		for (const permission in this.permissions) {
			if (this.permissions[permission].method != 'activate-deactivate' && this.permissions[permission].method != 'delete') {
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

		this.subjectsListForm = this.formBuilder.group({
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
				this.searchHeadquarters();
			}
		});

		this.ngOnChanges();
	}

	ngOnChanges() {
		this.subjectsListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.subjectsListForm.get('term');
	}

	get page() {
		return this.subjectsListForm.get('page');
	}

	get limit() {
		return this.subjectsListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchHeadquarters().then(() => this.progressSearch = false);
	}

	async searchbyname() {
		this.subjects = [];
		this.loadControl = 0;
		console.log(this.searchData.term);
		// return await this._headquarterService.searchbyname(this.searchData.term).then((response: any) => {
		// 	this.loadControl = 1;
		// 	this.subjects = response;
		// });
	}

	reset = () => {
		this.subjectsListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.subjects = [];
	}

	async searchHeadquarters() {
		this.subjects = [];
		this.loadControl = 0;
		return await this._subjectService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.subjects = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateHeadquarter(parameters.object);
				break;

			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente HeadquarterCreateComponent
	 */
	createSubjectModal = () => {
		 this._modalService.open({
		 	component: SubjectCreateComponent,
		 	title: 'Registro de una asignatura',
		 	size: 'modal-xl'
		 });
	}

	updateHeadquarter = (headquarter: any) => {
		// this._headquarterService.setHeadquarter(headquarter);
		//  this._modalService.open({
		//  	component: HeadquarterUpdateComponent,
		//  	title: 'Actualización de una Sede',
		//  	size: 'modal-xl'
		//  });
	}

	updateArea = (headquarter: Headquarter) => {
		// area.is_enabled = (area.is_enabled) ? 0 : 1;
		// this._areasService.update(area.id, area).then((response: any) => {
		// 	this._notificationService.success({
		// 		title: 'Información',
		// 		message: 'Ela área se ha actualizado correctamente.'
		// 	});
		// });

	}




	ngOnDestroy() {
		this._storageService.removeItem();
		this.storageSub.unsubscribe();
	}

}
