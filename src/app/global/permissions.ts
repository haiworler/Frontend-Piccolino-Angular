export class Permissions {

	public static CRUDPERMISSIONS: any = {

		// Permiso para actualizar registros
		update: {
			title: 'Actualizar',
			secondTitle: null,
			name: 'update',
			icon: 'fa fa-edit mr-2',
			class: 'btn btn-sm btn-pill btn-outline-success',
			method: 'update',
			parameter: null,
			condition: false,
		},

		// Permiso para activar/inactivar
		activateDeactivate: {
			title: 'Activar',
			secondTitle: 'Inactivar',
			name: 'activate-deactivate',
			icon: 'fa fa-check mr-2',
			class: 'btn btn-sm btn-pill btn-outline-warning',
			method: 'activate-deactivate',
			parameter: null,
			condition: true,
		},

		// Permiso para eliminar registros
		delete: {
			title: 'Eliminar',
			secondTitle: null,
			name: 'delete',
			icon: 'fa fa-trash fa-fw mr-2',
			class: 'btn btn-sm btn-pill btn-outline-danger',
			method: 'delete',
			parameter: null,
			condition: false,
		},
	};
}
