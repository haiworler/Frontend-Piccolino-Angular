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
import { AcademicLevelService } from '@services/app-services/configurations/documents/academic-level.service';
import { AcademicLevelCreateComponent } from '../academic-level-create/academic-level-create.component';
import { AcademicLevelUpdateComponent } from '../academic-level-update/academic-level-update.component';

@Component({
  selector: 'app-academic-level-list',
  templateUrl: './academic-level-list.component.html',
  styles: [
  ]
})
export class AcademicLevelListComponent implements OnInit,OnDestroy {
  heading = 'Niveles académicos';
	subheading = 'Listado';
	icon = 'lnr-book icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	trainingTypeListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	trainingType: any;
  trainingTypes: any;

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _academicLevelService: AcademicLevelService,
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
		this.trainingTypeListForm = this.formBuilder.group({
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
				this.searchtrainingTypes();
			}
		});

		this.ngOnChanges();
  }


	ngOnChanges() {
		this.trainingTypeListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.trainingTypeListForm.get('term');
	}

	get page() {
		return this.trainingTypeListForm.get('page');
	}

	get limit() {
		return this.trainingTypeListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchtrainingTypes().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.trainingTypeListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.trainingTypes = [];
		this.search();
	}

	async searchtrainingTypes() {
		this.trainingTypes = [];
		this.loadControl = 0;
		return await this._academicLevelService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.trainingTypes = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatetrainingType(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatetrainingTypeState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente IdentificationDocumentCreateComponent
	   */
	createtrainingTypeModal = () => {
		this._modalService.open({
			component: AcademicLevelCreateComponent,
			title: 'Registro de un nuevo nivel académico',
			size: 'modal-xl'
		});
	}


	updatetrainingType = (trainingType: any) => {
		this._academicLevelService.settrainingType(trainingType);
		this._modalService.open({
			component: AcademicLevelUpdateComponent,
			title: 'Actualización de un nivel académico',
			size: 'modal-xl'
		});
	}

	updatetrainingTypeState = (trainingType: any) => {
		trainingType.enabled = (trainingType.enabled) ? 0 : 1;
		this._academicLevelService.update(trainingType.id, trainingType).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El nivel académico se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
