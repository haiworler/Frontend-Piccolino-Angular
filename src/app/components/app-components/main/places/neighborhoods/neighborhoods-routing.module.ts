import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeighborhoodListComponent } from './neighborhood-list/neighborhood-list.component';


const routes: Routes = [
  {
    path: '',
    component: NeighborhoodListComponent,
    data: { breadcrumbs: 'Listado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NeighborhoodsRoutingModule { }
