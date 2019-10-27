import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ThemeOptions } from '../../../theme-options';
import { select } from '@angular-redux/store';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { MainService } from '@services/app-services/main.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

	permissions: any;
	userData: any;
	modul: any[];

	constructor(
		public globals: ThemeOptions,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private _authGuard: AuthGuardService,
		private _mainService: MainService
	) { }

	@select('config')
	public config$: Observable<any>;

	private newInnerWidth: number;
	private innerWidth: number;

	toggleSidebar(): void {
		this.globals.toggleSidebar = !this.globals.toggleSidebar;
	}

	sidebarHover(): void {
		this.globals.sidebarHover = !this.globals.sidebarHover;
	}

	ngOnInit(): void {

		setTimeout(() => {
			this.innerWidth = window.innerWidth;
			if (this.innerWidth < 1200) {
				this.globals.toggleSidebar = true;
			}
		});
		this.modul = [
			{
				route: '/headquarter', name: 'Sedes', icon: 'dashboard', class: ''
				, children: [
					{
						route: '/headquarter', name: 'Gestion Sedes', icon: 'how_to_reg', class: '', children: [], abstract: false
					}
				], abstract: true
			},
			{
				route: '/person', name: 'Personas', icon: 'dashboard', class: ''
				, children: [
					{
						route: '/person', name: 'Gestion Personas', icon: 'how_to_reg', class: '', children: [], abstract: false
					}
				], abstract: true
			}
		];

		this.userData = this._authGuard.resolve(this.activatedRoute.snapshot);
	}


	verifyActiveMenu = (route: string): string => (this.router.url.includes(route)) ? route : '';
	@HostListener('window:resize', ['$event'])
	onResize(event: any): void {
		this.newInnerWidth = event.target.innerWidth;
		this.globals.toggleSidebar = (this.newInnerWidth < 1200);
	}

}
