import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeOptions } from '../../../../../theme-options';
import { AuthService } from '@services/auth/auth.service';
import { NotificationsService } from '@services/shared/notifications.service';

@Component({
	selector: 'app-user-box',
	templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

	userData: any;
	roles: any;

	constructor(
		private globals: ThemeOptions,
		private router: Router,
		private _authService: AuthService,
		private _notificationsService: NotificationsService
	) {}

	ngOnInit(): void {
		this.userData = this._authService.currentUserValue;
		this.roles = this.userData.profile.map((role: any) => role.name).join(', ');
	}

	async logout(): Promise<any> {
		await this._authService.logout().then((response: any) => {
			if (response) {
				this._notificationsService.info({
					title: 'Información',
					message: response.message
				});
			}
		});
	}

}
