import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: 'cuts',
		loadChildren: () => import('./cuts/cuts.module').then(m => m.CutsModule),
		data: { breadcrumbs: 'Cortes' }
	},
  {
		path: 'enrolled',
		loadChildren: () => import('./enrolled/enrolled.module').then(m => m.EnrolledModule),
		data: { breadcrumbs: 'Matrícula' }
  },
  {
		path: 'grade',
		loadChildren: () => import('./grade/grade.module').then(m => m.GradeModule),
		data: { breadcrumbs: 'Grados' }
  }
  ,
  {
		path: 'semester',
		loadChildren: () => import('./semester/semester.module').then(m => m.SemesterModule),
		data: { breadcrumbs: 'Semestre' }
	},
	{
		  path: 'payments',
		  loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule),
		  data: { breadcrumbs: 'Pagos' }
	  }
	
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrollmentsRoutingModule { }
