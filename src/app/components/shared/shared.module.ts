import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentTitleComponent } from 'src/app/layouts/components/component-title/component-title.component';



@NgModule({
  declarations: [ComponentTitleComponent],
  imports: [
    CommonModule
  ],
  exports: [ComponentTitleComponent
  ]
})
export class SharedModule { }
