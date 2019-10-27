import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./components/app-components/app-components.module').then(m => m.AppComponentsModule)
	},
	{ path: '**', redirectTo: 'auth/login' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes,
		{
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			useHash: true
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
