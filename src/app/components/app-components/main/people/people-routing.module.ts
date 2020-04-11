import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: 'students',
		loadChildren: () => import('./students/students.module').then(m => m.StudentsModule),
		data: { breadcrumbs: 'Estudiantes' }
  },
  {
		path: 'voluntaries',
		loadChildren: () => import('./voluntaries/voluntaries.module').then(m => m.VoluntariesModule),
		data: { breadcrumbs: 'Voluntarios' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
