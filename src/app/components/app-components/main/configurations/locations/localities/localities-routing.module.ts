import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalitieListComponent } from './localitie-list/localitie-list.component';


const routes: Routes = [
  {
		path: '',
		component: LocalitieListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalitiesRoutingModule { }
