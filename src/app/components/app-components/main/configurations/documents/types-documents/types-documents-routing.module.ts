import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypesDocumentListComponent } from './types-document-list/types-document-list.component';


const routes: Routes = [
  {
		path: '',
		component: TypesDocumentListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesDocumentsRoutingModule { }
