import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: 'locations',
		loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
		data: { breadcrumbs: 'Ubicación' }
	},
  {
		path: 'documents',
		loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule),
		data: { breadcrumbs: 'Documentos' }
  },
  {
		path: 'general',
		loadChildren: () => import('./general/general.module').then(m => m.GeneralModule),
		data: { breadcrumbs: 'General' }
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
