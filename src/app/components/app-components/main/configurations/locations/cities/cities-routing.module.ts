import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitieListComponent } from './citie-list/citie-list.component';


const routes: Routes = [
  {
		path: '',
		component: CitieListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesRoutingModule { }
