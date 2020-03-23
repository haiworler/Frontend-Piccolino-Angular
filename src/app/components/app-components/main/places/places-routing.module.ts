import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: 'neighborhoods',
		loadChildren: () => import('./neighborhoods/neighborhoods.module').then(m => m.NeighborhoodsModule),
		data: { breadcrumbs: 'Barrio' }
	},
	{
		path: 'headquarters',
		loadChildren: () => import('./headquarter/headquarter.module').then(m => m.HeadquarterModule),
		data: { breadcrumbs: 'Sedes' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PlacesRoutingModule { }
