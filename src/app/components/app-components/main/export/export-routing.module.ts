import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { GroupComponent } from './group/group.component';
import { ReportingOptionsComponent } from './reporting-options/reporting-options.component';

const routes: Routes = [
  {
		path: 'student',
		component: StudentsComponent,
		data: { breadcrumbs: 'Personas' }
	},
	{
		path: 'group',
		component: GroupComponent,
		data: { breadcrumbs: 'Grupos' }
	},
	{
		path: 'generalReports',
		component: ReportingOptionsComponent,
		data: { breadcrumbs: 'Informes Generales' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportRoutingModule { }
