import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModalsModule } from './form-modals.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule
} from '@angular/material';

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
        MatButtonModule,
        MatInputModule,
        MatRippleModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        FormModalsModule,
        AngularFontAwesomeModule
    ]
})
export class ComponentsModalModule { }