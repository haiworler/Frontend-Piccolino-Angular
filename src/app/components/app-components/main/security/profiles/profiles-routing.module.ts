import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileListComponent } from './profile-list/profile-list.component';


const routes: Routes = [
  {
		path: '',
		component: ProfileListComponent,
		data: { breadcrumbs: 'Listado' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
