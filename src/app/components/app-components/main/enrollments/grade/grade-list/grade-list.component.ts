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
import { GradeService } from '@services/app-services/schools/grade.service';
import { GradeCreateComponent } from '../grade-create/grade-create.component';
import { GradeUpdateComponent } from '../grade-update/grade-update.component';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styles: []
})
export class GradeListComponent implements OnInit,OnDestroy {

  heading = 'Listado de grados';
	subheading = 'Listado';
	icon = 'fa fa-cogs icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	gradeListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	grade: any;
	grades: any;



  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _gradeService: GradeService,
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
		this.gradeListForm = this.formBuilder.group({
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
				this.searchgrades();
			}
		});

		this.ngOnChanges();
  }



	ngOnChanges() {
		this.gradeListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.gradeListForm.get('term');
	}

	get page() {
		return this.gradeListForm.get('page');
	}

	get limit() {
		return this.gradeListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchgrades().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.gradeListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.grades = [];
		this.search();
	}

	async searchgrades() {
		this.grades = [];
		this.loadControl = 0;
		return await this._gradeService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.grades = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updategrade(parameters.object);
				break;
			case 'activate-deactivate':
				this.updategradeState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente gradeCreateComponent
	   */
	creategradeModal = () => {
		this._modalService.open({
			component: GradeCreateComponent,
			title: 'Registro de un nuevo grado',
			size: 'modal-xl'
		});
	}


	updategrade = (grade: any) => {
		this._gradeService.setgrade(grade);
		this._modalService.open({
			component: GradeUpdateComponent,
			title: 'Actualización de un grado',
			size: 'modal-xl'
		});
	}

	updategradeState = (grade: any) => {
		grade.enabled = (grade.enabled) ? 0 : 1;
		this._gradeService.update(grade.id, grade).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El grado se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
