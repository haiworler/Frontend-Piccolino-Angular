import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
	{
		path: 'profiles',
		loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule),
		data: { breadcrumbs: 'Perfiles' }
  }
  ,
	{
		path: 'users',
		loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
		data: { breadcrumbs: 'Usuarios' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
