import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs';
import { select } from '@angular-redux/store';
import { ThemeOptions } from '../../theme-options';
import { animate, query, style, transition, trigger } from '@angular/animations';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { ModalService } from '@services/shared/modal.service';

@Component({
	selector: 'app-base-layout',
	templateUrl: './base-layout.component.html',
	animations: [
		trigger('animation', [
			transition('* <=> *', [
				query(':enter, :leave', [
					style({
						opacity: 0,
						display: 'flex',
						flex: '1',
						transform: 'translateY(-20px)',
						flexDirection: 'column'

					}),
				]),
				query(':enter', [
					animate('600ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
				]),
				query(':leave', [
					animate('600ms ease', style({ opacity: 0, transform: 'translateY(-20px)' })),
				], { optional: true })
			]),
		])
	]
})

export class BaseLayoutComponent implements OnInit, OnDestroy {

	@select('config') public config$: Observable<any>;

	userData: any = [];
	_routeListener: any;

	constructor(
		public globals: ThemeOptions,
		private router: Router,
		private route: ActivatedRoute,
		private _authGuard: AuthGuardService,
		private _modalService: ModalService
	) {}

	toggleSidebarMobile(): void {
		this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
	}

	ngOnInit(): void {

		this._routeListener = this.router.events.subscribe((event) => {
			if (event instanceof RoutesRecognized) {
				this._modalService.reset();
				this._authGuard.canActivate(this.route.snapshot, event.state);
			}
		});

		this.userData = setTimeout(() => this._authGuard.resolve(this.route.snapshot));

	}

	ngOnDestroy(): void {
		this._routeListener.unsubscribe();
	}

}



