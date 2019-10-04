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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

registerLocaleData(localeEs, 'es');


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
    },
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    }
  ],
  exports: [
    ModalComponent
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
