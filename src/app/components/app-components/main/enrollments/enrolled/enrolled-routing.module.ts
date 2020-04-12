import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrolledListComponent } from './enrolled-list/enrolled-list.component';


const routes: Routes = [
  {
		path: '',
		component: EnrolledListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrolledRoutingModule { }
