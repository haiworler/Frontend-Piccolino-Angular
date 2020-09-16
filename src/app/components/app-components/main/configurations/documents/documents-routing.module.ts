import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
		path: 'identificationDocuments',
		loadChildren: () => import('./identification-documents/identification-documents.module').then(m => m.IdentificationDocumentsModule),
		data: { breadcrumbs: 'Documentos de identificación' }
	},
  {
		path: 'typesDocuments',
		loadChildren: () => import('./types-documents/types-documents.module').then(m => m.TypesDocumentsModule),
		data: { breadcrumbs: 'Tipos de documentos' }
  },
  {
		path: 'academicLevels',
		loadChildren: () => import('./academic-levels/academic-levels.module').then(m => m.AcademicLevelsModule),
		data: { breadcrumbs: 'Niveles académicos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
