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
import { IdentificationDocumentService } from '@services/app-services/configurations/documents/identification-document.service';
import { IdentificationDocumentCreateComponent } from '../identification-document-create/identification-document-create.component';
import { IdentificationDocumentUpdateComponent } from '../identification-document-update/identification-document-update.component';

@Component({
  selector: 'app-identification-document-list',
  templateUrl: './identification-document-list.component.html',
  styles: [
  ]
})
export class IdentificationDocumentListComponent implements OnInit,OnDestroy {

  heading = 'Documentos de identificación';
	subheading = 'Listado';
	icon = 'lnr-file-add icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	searchData: any;
	storageSub: any = null;
	progressSearch: boolean | number = false;
	typeDocumentListForm: FormGroup;
	loadControl: any = 0;

	buttonsOp: any[] = [];
	permissions: any[];
	currentRoute: any;

	typeDocument: any;
  typeDocuments: any;
  

  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _identificationDocumentService: IdentificationDocumentService,
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
		this.typeDocumentListForm = this.formBuilder.group({
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
				this.searchtypeDocuments();
			}
		});

		this.ngOnChanges();
  }


	ngOnChanges() {
		this.typeDocumentListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.typeDocumentListForm.get('term');
	}

	get page() {
		return this.typeDocumentListForm.get('page');
	}

	get limit() {
		return this.typeDocumentListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchtypeDocuments().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.typeDocumentListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.typeDocuments = [];
		this.search();
	}

	async searchtypeDocuments() {
		this.typeDocuments = [];
		this.loadControl = 0;
		return await this._identificationDocumentService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.typeDocuments = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updatetypeDocument(parameters.object);
				break;
			case 'activate-deactivate':
				this.updatetypeDocumentState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	   * Abre el modal seteando el componente IdentificationDocumentCreateComponent
	   */
	createtypeDocumentModal = () => {
		this._modalService.open({
			component: IdentificationDocumentCreateComponent,
			title: 'Registro de un nuevo documento de identificación',
			size: 'modal-xl'
		});
	}


	updatetypeDocument = (typeDocument: any) => {
		this._identificationDocumentService.settypeDocument(typeDocument);
		this._modalService.open({
			component: IdentificationDocumentUpdateComponent,
			title: 'Actualización de un documento de identificación',
			size: 'modal-xl'
		});
	}

	updatetypeDocumentState = (typeDocument: any) => {
		typeDocument.enabled = (typeDocument.enabled) ? 0 : 1;
		this._identificationDocumentService.update(typeDocument.id, typeDocument).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El documento se ha actualizado correctamente.'
			});
		});
	}

	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}


}
