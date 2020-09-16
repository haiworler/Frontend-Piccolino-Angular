import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OccupationListComponent } from './occupation-list/occupation-list.component';


const routes: Routes = [
  {
		path: '',
		component: OccupationListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupationsRoutingModule { }
