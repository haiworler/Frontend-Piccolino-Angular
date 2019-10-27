import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private token: any;
	public user: BehaviorSubject<any>;
	private currentUser: Observable<any>;

	progress: boolean | number = false;

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.token = localStorage.getItem('token');
		this.user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
		this.currentUser = this.user.asObservable();
	}

	get currentUserValue(): any {
		return this.user.value;
	}

	async login(name: string, password: string): Promise<any> {
		return await this.http.post(`${environment.UrlApi}/auth/login`, { name: name, password: password }).toPromise();
	}

	isAuthenticated = (): boolean => !!this.currentUserValue;

	async logout(): Promise<any> {
		const response: any = (localStorage.getItem('token')) ? await this.http.get(`${environment.UrlApi}/auth/logout`).toPromise() : null;
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.user.next(null);
		this.router.navigate(['/auth/login']);
		return response;
	}

}
