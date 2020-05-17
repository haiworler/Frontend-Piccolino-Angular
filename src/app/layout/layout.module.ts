import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';

import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { UserBoxComponent } from './components/header/elements/user-box/user-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		BaseLayoutComponent,
		PagesLayoutComponent,
		HeaderComponent,
		PageTitleComponent,
		UserBoxComponent,
		SidebarComponent,
		FooterComponent,
	],
	imports: [
		CommonModule,
		NgProgressModule,
		NgProgressHttpModule,
		FontAwesomeModule,
		PerfectScrollbarModule,
		NgbModule,
		RouterModule,
		PpBreadcrumbsModule,
	],
	exports: [
		BaseLayoutComponent,
		PagesLayoutComponent,
		HeaderComponent,
		PageTitleComponent,
		UserBoxComponent,
		SidebarComponent,
		FooterComponent
	],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA
	  ]
})
export class LayoutModule {}
