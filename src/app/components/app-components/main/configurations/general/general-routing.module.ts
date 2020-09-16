import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: 'occupations',
		loadChildren: () => import('./occupations/occupations.module').then(m => m.OccupationsModule),
		data: { breadcrumbs: 'Ocupaciones' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
