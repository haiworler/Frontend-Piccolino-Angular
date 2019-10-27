import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivilegesComponent } from './privileges/privileges.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		data: { breadcrumbs: 'Dashboard' }
	},
	{
		path: 'privileges',
		component: PrivilegesComponent,
		data: { breadcrumbs: 'Privilegios' }
	},
	{
		path: 'headquarter',
		loadChildren: () => import('./headquarter/headquarter.module').then(m => m.HeadquarterModule),
		data: { breadcrumbs: 'Sedes' }
	},
	{
		path: 'person',
		loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
		data: { breadcrumbs: 'Personas' }
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
