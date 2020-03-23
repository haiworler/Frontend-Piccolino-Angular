import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeadquarterListComponent } from './headquarter-list/headquarter-list.component';


const routes: Routes = [
	{
		path: '',
		component: HeadquarterListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadquarterRoutingModule { }
