import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalsModule } from './form-modals.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../vendor/angular-material.module';





@NgModule({
    entryComponents: [
        ModalComponent,
    ],
    declarations: [
        ModalComponent,
    ],
    imports: [
        CommonModule,
        FormModalsModule,
        AngularFontAwesomeModule,
        PerfectScrollbarModule,
        SlickCarouselModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule
    ],
    exports: [
        CommonModule,
        FormModalsModule,
        AngularFontAwesomeModule,
        AngularMaterialModule
    ]
})
export class ComponentsModalModule { }