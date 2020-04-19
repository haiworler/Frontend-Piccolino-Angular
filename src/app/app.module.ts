import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './theme-options/store';
import { ConfigActions } from './theme-options/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbDateParserFormatter, NgbDatepickerI18n, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { NgxLoadingModule } from 'ngx-loading';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountUpModule } from 'countup.js-angular2';
// import {AgmCoreModule} from '@agm/core';
// import {ImageCropperModule} from 'ngx-image-cropper';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
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
// import {ChartsModule} from 'ng2-charts';

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
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';
import { ThemeOptions } from './theme-options';
import { LayoutModule } from './layout/layout.module';

import { JwtInterceptor } from '@services/interceptors/jwt.service';
import { ErrorsInterceptor } from '@services/interceptors/errors.service';
import { CUSTOM_ERRORS } from '@global/custom-errors';

import { ModalComponent } from '@components/shared/modal/modal.component';

import { DatePipe } from '../../node_modules/@angular/common';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

registerLocaleData(localeEs, 'es');

// const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
// 	// Change this to your upload POST address:
// 	url: 'https://httpbin.org/post',
// 	maxFilesize: 50,
// 	acceptedFiles: 'image/*'
// };

@NgModule({
	declarations: [
		AppComponent,
		ModalComponent
	],
	entryComponents: [ModalComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgReduxModule,
		CommonModule,
		NgProgressModule,
		NgProgressHttpModule,
		LayoutModule,
		PerfectScrollbarModule,
		NgbModule,
		AngularFontAwesomeModule,
		LaddaModule,
		FormsModule,
		ReactiveFormsModule,
		NgBootstrapFormValidationModule.forRoot(),
		NgxLoadingModule.forRoot({}),
		RoundProgressModule,
		SweetAlert2Module.forRoot({
			buttonsStyling: false,
			customClass: 'modal-content',
			confirmButtonClass: 'btn btn-primary',
			cancelButtonClass: 'btn'
		}),
		ToastrModule.forRoot(),
		SlickCarouselModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		CountUpModule,
		AngularStickyThingsModule,
		NouisliderModule,
		NgSelectModule,
		SelectDropDownModule,
		NgMultiSelectDropDownModule.forRoot(),
		JwBootstrapSwitchNg2Module,
		AngularEditorModule,
		HttpClientModule,
		TextMaskModule,
		ClipboardModule,
		TextareaAutosizeModule,
		ColorPickerModule,
		DropzoneModule,

		// Angular Material Components

		MatCheckboxModule,
		MatCheckboxModule,
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
		MatStepperModule,
		MatTabsModule,
		MatExpansionModule,
		MatButtonToggleModule,
		MatChipsModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatProgressBarModule,
		MatDialogModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatTableModule,
		MatSortModule,
		MatPaginatorModule,
		MatTreeModule,
		MatRippleModule,

		// Breadcrumbs
		PpBreadcrumbsModule,

	],
	providers: [DatePipe,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
		{
			provide:
				PERFECT_SCROLLBAR_CONFIG,
			// DROPZONE_CONFIG,
			useValue:
				DEFAULT_PERFECT_SCROLLBAR_CONFIG,
			// DEFAULT_DROPZONE_CONFIG,
		},
		{
			provide: CUSTOM_ERROR_MESSAGES,
			useValue: CUSTOM_ERRORS,
			multi: true
		},
		ConfigActions,
		ThemeOptions,
	],
	exports: [
		ModalComponent
	],
	bootstrap: [AppComponent]
})

export class AppModule {

	constructor(
		private ngRedux: NgRedux<ArchitectUIState>,
		private devTool: DevToolsExtension
	) {

		this.ngRedux.configureStore(
			rootReducer,
			{} as ArchitectUIState,
			[],
			[devTool.isEnabled() ? devTool.enhancer() : f => f]
		);

	}

}
