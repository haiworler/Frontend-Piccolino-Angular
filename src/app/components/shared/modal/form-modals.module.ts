import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HeadquarterCreateComponent } from '../../headquarters/headquarter-create/headquarter-create.component';
import { AngularMaterialModule } from '../vendor/angular-material.module';



@NgModule({
  declarations: [
    HeadquarterCreateComponent
  ],
  entryComponents: [
    HeadquarterCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgbModule,
    PerfectScrollbarModule,
    SlickCarouselModule,
    AngularFontAwesomeModule,
    AngularMaterialModule

  ],
  exports: [
    CommonModule,
    FormsModule,

  ]
})
export class FormModalsModule { }