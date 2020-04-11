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
	{
		path: 'people',
		loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
		data: { breadcrumbs: 'Personas' }
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
