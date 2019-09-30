import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {LayoutModule} from '../layouts/components/layout.module';
import { PersonComponent } from './person/person.component';



@NgModule({
  declarations: [LoginComponent,PersonComponent],
  imports: [
    CommonModule,
    LayoutModule
  ],
 
})
export class ComponentsModule { }
