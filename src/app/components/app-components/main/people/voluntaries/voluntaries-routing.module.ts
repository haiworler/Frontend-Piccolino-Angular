import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoluntaryListComponent } from './voluntary-list/voluntary-list.component';


const routes: Routes = [
  {
		path: '',
		component: VoluntaryListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoluntariesRoutingModule { }
