import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@layout/layout.module';

import { AppComponentsRoutingModule } from './app-components-routing.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AppComponentsRoutingModule,
		LayoutModule
	]
})
export class AppComponentsModule {}
