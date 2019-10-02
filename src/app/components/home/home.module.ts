import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutes } from './home.routing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PersonComponent } from '../person/person.component';
import {LayoutModule } from '../../layouts/components/layout.module';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { ComponentsModule } from '../components.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    LayoutModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    PersonComponent
  ]
})

export class HomeModule {}
