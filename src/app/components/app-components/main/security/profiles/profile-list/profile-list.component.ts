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
import { ProfileService } from '@services/app-services/security/profile.service';
import { ProfileUpdateComponent } from '../profile-update/profile-update.component';
import { ProfileCreateComponent } from '../profile-create/profile-create.component';

@Component({
	selector: 'app-profile-list',
	templateUrl: './profile-list.component.html',
	styles: []
})
export class ProfileListComponent implements OnInit,OnDestroy {

	heading = 'Perfiles';
	subheading = 'Listado';
	icon = 'fa fa-unlock-alt icon-gradient bg-night-sky';
	primaryColour = '#fff';
	secondaryColour = '#ccc';
	storageSub: any = null;
	profile: any;
	searchData: any;
	progressSearch: boolean | number = false;
	profileListForm: FormGroup;
	loadControl: any = 0;
	buttonsOp: any[] = [];
	userData: any;
	permissions: any[];
	currentRoute: any;
	profiles: any;

	constructor(
		private formBuilder: FormBuilder,
		private _modalService: ModalService,
		private _storageService: StorageService,
		private _notificationService: NotificationsService,
		private _mainService: MainService,
		private router: Router,
		private _profileService: ProfileService,
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

		this.profileListForm = this.formBuilder.group({
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
				this.searchprofiles();
			}
		});

		this.ngOnChanges();
	}

	ngOnChanges() {
		this.profileListForm.valueChanges.subscribe((form: any) => {
			this.searchData = {
				term: form.term,
				page: form.page,
				limit: form.limit
			};
		});

	}

	get term() {
		return this.profileListForm.get('term');
	}

	get page() {
		return this.profileListForm.get('page');
	}

	get limit() {
		return this.profileListForm.get('limit');
	}

	search = () => {
		this.progressSearch = 0;
		this.searchprofiles().then(() => this.progressSearch = false);
	}

	reset = () => {
		this.profileListForm.reset();
		this.term.setValue('');
		this.page.setValue(1);
		this.limit.setValue(10);
		this.profiles = [];
	}

	async searchprofiles() {
		this.profiles = [];
		this.loadControl = 0;
		return await this._profileService.search(this.searchData).then((response: any) => {
			this.loadControl = 1;
			this.profiles = response;
		});
	}

	pageChange = (page: number) => {
		this.page.setValue(page);
		this.search();
	}

	selectionOptions(parameters: any = null) {
		switch (parameters.parameters.method) {
			case 'update':
				this.updateprofile(parameters.object);
				break;
			case 'activate-deactivate':
				this.updateprofileState(parameters.object);
				break;
			default:
				break;
		}
	}

	/**
	 * Abre el modal seteando el componente profileCreateComponent
	 */
	createprofileModal = () => {
		this._modalService.open({
			component: ProfileCreateComponent,
			title: 'Registro de un perfil',
			size: 'modal-xl'
		});
	}

	updateprofile = (profile: any) => {
		this._profileService.setprofile(profile);
		this._modalService.open({
			component: ProfileUpdateComponent,
			title: 'Actualización de un perfil',
			size: 'modal-xl'
		});
	}

	updateprofileState = (profile: any) => {
		profile.enabled = (profile.enabled) ? 0 : 1;
		let data = {
			enabled: profile.enabled,
			name: profile.name,
			modules: []
		}
		this._profileService.update(profile.id, data).then((response: any) => {
			this._notificationService.success({
				title: 'Información',
				message: 'El perfil se ha actualizado correctamente.'
			});
		});

	}



	ngOnDestroy() {
		this.storageSub.unsubscribe();
	}

}
