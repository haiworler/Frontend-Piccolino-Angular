import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: 'country',
		loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
		data: { breadcrumbs: 'País' }
	},
  {
		path: 'departments',
		loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule),
		data: { breadcrumbs: 'Departamentos' }
  },
  {
		path: 'cities',
		loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule),
		data: { breadcrumbs: 'Ciudades' }
  }
  ,
  {
		path: 'localities',
		loadChildren: () => import('./localities/localities.module').then(m => m.LocalitiesModule),
		data: { breadcrumbs: 'Localidades' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
