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
		path: 'places',
		loadChildren: () => import('./places/places.module').then(m => m.PlacesModule),
		data: { breadcrumbs: 'Lugares' }
	},
	{
		path: 'people',
		loadChildren: () => import('./people/people.module').then(m => m.PeopleModule),
		data: { breadcrumbs: 'Personas' }
	}
	,
	{
		path: 'enrollments',
		loadChildren: () => import('./enrollments/enrollments.module').then(m => m.EnrollmentsModule),
		data: { breadcrumbs: 'Inscripciones' }
	}
	,
	{
		path: 'groups',
		loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule),
		data: { breadcrumbs: 'Grupos' }
	}
	,
	{
		path: 'notes',
		loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule),
		data: { breadcrumbs: 'Notas' }
	}
	,
	{
		path: 'security',
		loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
		data: { breadcrumbs: 'Seguridad' }
	},
	{
		path: 'export',
		loadChildren: () => import('./export/export.module').then(m => m.ExportModule),
		data: { breadcrumbs: 'Informes' }
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
