import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
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
import { UserService } from '@services/app-services/security/user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {

  heading = 'Usuarios';
	subheading = 'Listado';
	icon = 'fa fa-key icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	storageSub: any = null;
	user: any;
	searchData: any;
	progressSearch: boolean | number = false;
	userListForm: FormGroup;
	loadControl: any = 0;
	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	users: any;


  constructor(
    private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _mainService: MainService,
		private router: Router,
		private _userService: UserService,
  ) { }

  ngOnInit() {

    this.userData = this._mainService.getUserData();
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

		this.userListForm = this.formBuilder.group({
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
				this.searchusers();
			}
		});

		this.ngOnChanges();
  }

  ngOnChanges() {
		this.userListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.userListForm.get('term');
	}

	get page() {
		return this.userListForm.get('page');
	}

	get limit() {
		return this.userListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchusers().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.userListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.users = [];
	}

	async searchusers() {
		this.users = [];
		this.loadControl = 0;
		return await this._userService.search(this.searchData).then((response: any) => {
      this.loadControl = 1;
      console.log('Users: ', response);
			this.users = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateuser(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateuserState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente userCreateComponent
	 */
	createuserModal = () => {
		this._modalService.open({
			component: UserCreateComponent,
			title: 'Registro de un usuario',
			size: 'modal-xl'
		});
	}

	updateuser = (user: any) => {
		this._userService.setuser(user);
		this._modalService.open({
			component: UserUpdateComponent,
			title: 'Actualización de un usuario',
			size: 'modal-xl'
		});
	}

	updateuserState = (user: any) => {
		user.enabled = (user.enabled) ? 0 : 1;
		let data = {
			enabled: user.enabled,
			name: user.name,
			modules: []
		}
		this._userService.update(user.id, data).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El usuario se ha actualizado correctamente.'
			});
		});

	}



	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
