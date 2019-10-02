import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {LayoutModule} from '../layouts/components/layout.module';
import { PersonComponent } from './person/person.component';
import { ComponentTitleComponent } from '../layouts/components/component-title/component-title.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [LoginComponent,PersonComponent,ComponentTitleComponent],
  imports: [
    CommonModule,
    LayoutModule,
    SharedModule
  ]
 
 
})
export class ComponentsModule { }
