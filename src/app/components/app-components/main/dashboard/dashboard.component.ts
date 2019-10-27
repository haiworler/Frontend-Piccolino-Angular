import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent implements OnInit {

	userData: any;
	roles: any;

	constructor(
		private _authService: AuthService
	) {}

	ngOnInit(): void {
		this.userData = this._authService.currentUserValue;
	}

}
