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
import { TypesDocumentService } from '@services/app-services/configurations/documents/types-document.service';
import { TypesDocumentCreateComponent } from '../types-document-create/types-document-create.component';
import { TypesDocumentUpdateComponent } from '../types-document-update/types-document-update.component';

@Component({
  selector: 'app-types-document-list',
  templateUrl: './types-document-list.component.html',
  styles: [
  ]
})
export class TypesDocumentListComponent implements OnInit,OnDestroy {

  heading = 'Tipos de documentos';
	subheading = 'Listado';
	icon = 'lnr-file-empty icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	categoryDocumentListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	categoryDocument: any;
  categoryDocuments: any;

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _typesDocumentService: TypesDocumentService,
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
		this.categoryDocumentListForm = this.formBuilder.group({
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
				this.searchcategoryDocuments();
			}
		});

		this.ngOnChanges();
  }


	ngOnChanges() {
		this.categoryDocumentListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.categoryDocumentListForm.get('term');
	}

	get page() {
		return this.categoryDocumentListForm.get('page');
	}

	get limit() {
		return this.categoryDocumentListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchcategoryDocuments().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.categoryDocumentListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.categoryDocuments = [];
		this.search();
	}

	async searchcategoryDocuments() {
		this.categoryDocuments = [];
		this.loadControl = 0;
		return await this._typesDocumentService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.categoryDocuments = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatecategoryDocument(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatecategoryDocumentState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente IdentificationDocumentCreateComponent
	   */
	createcategoryDocumentModal = () => {
		this._modalService.open({
			component: TypesDocumentCreateComponent,
			title: 'Registro de un nuevo tipo de documento',
			size: 'modal-xl'
		});
	}


	updatecategoryDocument = (categoryDocument: any) => {
		this._typesDocumentService.setcategoryDocument(categoryDocument);
		this._modalService.open({
			component: TypesDocumentUpdateComponent,
			title: 'Actualización de un tipo de documento',
			size: 'modal-xl'
		});
	}

	updatecategoryDocumentState = (categoryDocument: any) => {
		categoryDocument.enabled = (categoryDocument.enabled) ? 0 : 1;
		this._typesDocumentService.update(categoryDocument.id, categoryDocument).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El tipo de documento se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
