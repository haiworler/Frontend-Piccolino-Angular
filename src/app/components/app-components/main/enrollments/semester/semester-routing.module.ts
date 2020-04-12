import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterListComponent } from './semester-list/semester-list.component';


const routes: Routes = [
  {
		path: '',
		component: SemesterListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemesterRoutingModule { }
