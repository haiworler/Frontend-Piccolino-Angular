import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicLevelListComponent } from './academic-level-list/academic-level-list.component';


const routes: Routes = [
  {
		path: '',
		component: AcademicLevelListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicLevelsRoutingModule { }
