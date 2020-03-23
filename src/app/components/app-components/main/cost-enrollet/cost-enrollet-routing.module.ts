import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostEnrolletListComponent } from './cost-enrollet-list/cost-enrollet-list.component';


const routes: Routes = [
  {
    path: '',
    component: CostEnrolletListComponent,
    data: { breadcrumbs: 'Listado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostEnrolletRoutingModule { }
