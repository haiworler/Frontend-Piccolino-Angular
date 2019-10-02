import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'deshboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          extraParameter: 'dashboard'
        }
      }
      ,
      {
        path: 'person',
        loadChildren: () => import('./components/person/person.module').then(m => m.PersonModule),
        data: {
          extraParameter: 'person'
        }
      },
      {
        path: 'headquarter',
        loadChildren: () => import('./components/headquarters/headquarters.module').then(m => m.HeadquartersModule),
        data: {
          extraParameter: 'headquarter'
        }
      }

    ]
  },
  {
    path: 'auth',
    component: PagesLayoutComponent,
    children: [
      {

        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
        data: {
          extraParameter: 'Login'
        }
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }

];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        useHash: true
      })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


