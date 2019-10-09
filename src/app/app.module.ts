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
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './components/home/home.component';
// Interceptores
import { JwtService } from './services/interceptors/jwt.service';
import { ErrorsService } from './services/interceptors/errors.service';
// General
import { SidebarComponent } from '../app/layouts/components/sidebar/sidebar.component';
import { NavbarComponent } from '../app/layouts/components/navbar/navbar.component';
import { FooterComponent } from '../app/layouts/components/footer/footer.component';
// Login
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
//Responsi
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
//Modal
import { ComponentsModalModule } from '../app/components/shared/modal/components-modal.module';
import { MatStepperModule } from '@angular/material/stepper';



// BOOTSTRAP COMPONENTS

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { NgxLoadingModule } from 'ngx-loading';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountUpModule } from 'countup.js-angular2';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { AngularStickyThingsModule } from '@w11k/angular-sticky-things';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// ANGULAR MATERIAL COMPONENTS

import { MatCheckboxModule, MatRippleModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
// Idioma Local
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
    MatDialogModule,
    ComponentsModalModule,
    MatStepperModule,
    // Material.
    AngularFontAwesomeModule,
    NgbModule,
    PerfectScrollbarModule,
    LaddaModule,
    NgxLoadingModule,
    RoundProgressModule,
    ToastrModule,
    SlickCarouselModule,
    CalendarModule,
    CountUpModule,
    NgBootstrapFormValidationModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule,
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // ANGULAR MATERIAL COMPONENTS

    MatCheckboxModule, MatRippleModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule  


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    PagesLayoutComponent
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
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
