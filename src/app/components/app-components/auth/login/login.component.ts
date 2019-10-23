import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	error: string;
	progress: boolean | number = false;
	currentDate: any;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private _authService: AuthService,
	) { }

	ngOnInit(): void {


		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]]
		});

		// this.currentDate = new Date();

	}

	get controls(): any {
		return this.loginForm.controls;
	}

	login = (): void => {
		this.progress = 0;
		this._authService.login(this.controls.username.value, this.controls.password.value).then((response: any) => {
			if (response && response.token) {
				localStorage.setItem('token', response.token);
				localStorage.setItem('user', JSON.stringify(response.user));
				this._authService.user.next(response.user);
				this.progress = 1;
				this.router.navigate(['/dashboard']);
			}
		}).catch((error: any) => {
			this.progress = false;
		});
	}

}
