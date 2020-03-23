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
		path: 'person',
		loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
		data: { breadcrumbs: 'Personas' }
	},
	{
		path: 'subject',
		loadChildren: () => import('./subject/subject.module').then(m => m.SubjectModule),
		data: { breadcrumbs: 'Asignaturas' }
	},
	{
		path: 'cost-enrollet',
		loadChildren: () => import('./cost-enrollet/cost-enrollet.module').then(m => m.CostEnrolletModule),
		data: { breadcrumbs: 'Costo de la matrícula' }
	},
	{
		path: 'places',
		loadChildren: () => import('./places/places.module').then(m => m.PlacesModule),
		data: { breadcrumbs: 'Lugares' }
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
