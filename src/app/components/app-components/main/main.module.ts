import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivilegesComponent } from './privileges/privileges.component';

@NgModule({
	declarations: [DashboardComponent, PrivilegesComponent],
	imports: [
		CommonModule,
		MainRoutingModule
	]
})
export class MainModule {}
