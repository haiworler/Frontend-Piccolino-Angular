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
	modul: any[] = [];
	profile: any = [];

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

		this.profile = JSON.parse(localStorage.getItem('user'));

		// this.modul = [
		// 	{
		// 		route: '/places', name: 'Lugares', icon: 'dashboard', class: ''
		// 		, children: [
		// 			{
		// 				route: '/places/neighborhoods', name: 'Gestion de barrios', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			},
		// 			{
		// 				route: '/places/headquarters', name: 'Gestion de Sedes', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			}
		// 		], abstract: true
		// 	},
		// 	{
		// 		route: '/people', name: 'Personas', icon: 'dashboard', class: ''
		// 		, children: [
		// 			{
		// 				route: '/people/students', name: 'Gestion de Estudiantes', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			},
		// 			{
		// 				route: '/people/voluntaries', name: 'Gestion de voluntarios', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			}
		// 		], abstract: true
		// 	},
		// 	{
		// 		route: '/subject', name: 'Asignaturas', icon: 'dashboard', class: ''
		// 		, children: [
		// 			{
		// 				route: '/subject', name: 'Gestion Asignaturas', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			}
		// 		], abstract: true
		// 	}
		// 	,
		// 	{
		// 		route: '/enrollments', name: 'Inscripciones', icon: 'dashboard', class: ''
		// 		, children: [
		// 			{
		// 				route: '/enrollments/cuts', name: 'Gestion de Cortes', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			},
		// 			{
		// 				route: '/enrollments/semester', name: 'Gestion de Semestres', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			},
		// 			{
		// 				route: '/enrollments/grade', name: 'Gestion de Grados', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			}
		// 			,
		// 			{
		// 				route: '/enrollments/enrolled', name: 'Gestion de Matrículas', icon: 'how_to_reg', class: '', children: [], abstract: false
		// 			}
		// 		], abstract: true
		// 	},
		// 	{
		// 		route: '/groups', name: 'Grupos', icon: 'dashboard', class: ''
		// 		, children: [
		// 			{
		// 				route: '/groups', name: 'Gestion grupos', icon: 'how_to_reg', class: '', children: [], abstract: true
		// 			}
		// 		], abstract: true
		// 	},
		// 	{
		// 		route: '/notes', name: 'Notas', icon: '', class: ''
		// 		, children: [
		// 			{
		// 				route: '/notes/create', name: 'Registrar', icon: 'how_to_reg', class: '', children: [], abstract: true
		// 			},
		// 			{
		// 				route: '/notes/update', name: 'Actualizar', icon: 'how_to_reg', class: '', children: [], abstract: true
		// 			}
		// 		], abstract: true
		// 	}
		// 	,
		// 	{
		// 		route: '/security', name: 'Seguridad', icon: '', class: ''
		// 		, children: [
		// 			{
		// 				route: '/security/profiles', name: 'Perfiles', icon: 'how_to_reg', class: '', children: [], abstract: true
		// 			},
		// 			{
		// 				route: '/security/users', name: 'Usuario', icon: 'how_to_reg', class: '', children: [], abstract: true
		// 			}
		// 		], abstract: true
		// 	}

		// ];
		

		this.modul = this.profile.profile.modules;
		this.userData = this._authGuard.resolve(this.activatedRoute.snapshot);
	}


	verifyActiveMenu = (route: string): string => (this.router.url.includes(route)) ? route : '';
	@HostListener('window:resize', ['$event'])
	onResize(event: any): void {
		this.newInnerWidth = event.target.innerWidth;
		this.globals.toggleSidebar = (this.newInnerWidth < 1200);
	}

}
