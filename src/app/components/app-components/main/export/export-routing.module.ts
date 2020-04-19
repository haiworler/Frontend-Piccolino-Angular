import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';


const routes: Routes = [
  {
		path: 'student',
		component: StudentsComponent,
		data: { breadcrumbs: 'Personas' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
