import { Component, HostBinding } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ThemeOptions } from '../../../theme-options';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {

	constructor(
		public globals: ThemeOptions
	) {}

	@HostBinding('class.isActive')
	get isActiveAsGetter(): any {
		return this.isActive;
	}

	isActive: boolean;

	@select('config')
	public config$: Observable<any>;

	toggleSidebarMobile(): void {
		this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
	}

	toggleHeaderMobile(): void {
		this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
	}

}
