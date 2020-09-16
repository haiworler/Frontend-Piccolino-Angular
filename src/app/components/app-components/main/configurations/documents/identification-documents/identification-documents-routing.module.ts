import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificationDocumentListComponent } from './identification-document-list/identification-document-list.component';


const routes: Routes = [
  {
		path: '',
		component: IdentificationDocumentListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentificationDocumentsRoutingModule { }
