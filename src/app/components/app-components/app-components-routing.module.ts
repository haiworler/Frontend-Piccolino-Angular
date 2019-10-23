import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@services/guards/auth-guard.service';
import { BaseLayoutComponent } from '@layout/base-layout/base-layout.component';
import { PagesLayoutComponent } from '@layout/pages-layout/pages-layout.component';

const routes: Routes = [
	{
		path: 'auth',
		component: PagesLayoutComponent,
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: '',
		component: BaseLayoutComponent,
		canActivate: [AuthGuardService],
		loadChildren: () => import('./main/main.module').then(m => m.MainModule),
		data: { breadcrumbs: `<i class="fa fa-home"></i>` }
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppComponentsRoutingModule {}
