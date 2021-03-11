import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssistanceRegisterComponent } from './assistance-register/assistance-register.component';


const routes: Routes = [
  {
		path: 'create',
		component: AssistanceRegisterComponent,
		data: { breadcrumbs: 'Registrar' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssistancesRoutingModule { }
