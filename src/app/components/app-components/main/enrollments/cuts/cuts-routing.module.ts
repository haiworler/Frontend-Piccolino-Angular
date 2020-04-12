import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutListComponent } from './cut-list/cut-list.component';
const routes: Routes = [
  {
		path: '',
		component: CutListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutsRoutingModule { }
