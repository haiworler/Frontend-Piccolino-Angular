import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteUpdateComponent } from './note-update/note-update.component';


const routes: Routes = [
  {
		path: 'create',
		component: NoteCreateComponent,
		data: { breadcrumbs: 'Registrar' }
	},
	{
		path: 'update',
		component: NoteUpdateComponent,
		data: { breadcrumbs: 'Actualizar' }
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
