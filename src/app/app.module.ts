import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';



import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './components/home/home.component';

// Interceptores
import { JwtService } from './services/interceptors/jwt.service';
import { ErrorsService } from './services/interceptors/errors.service';
import { SidebarComponent } from '../app/layouts/components/sidebar/sidebar.component';
import { NavbarComponent } from '../app/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../app/layouts/components/footer/footer.component';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { ModalComponent } from './components/shared/modal/modal.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarRouterModule,

  ],
  entryComponents: [ModalComponent],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PagesLayoutComponent,
    ModalComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtService, multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorsService, multi: true,
    }
  ],
  exports: [
		ModalComponent
	],
  bootstrap: [AppComponent],

})
export class AppModule { }
