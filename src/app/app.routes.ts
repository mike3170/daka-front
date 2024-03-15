import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: "", redirectTo: "punch", pathMatch: "full" },

	{ path: "punch",
		loadChildren: () =>  import("../app/punch/punch.routes").then(r => r.PUNCH_ROUTES),
	},

	{ path: "xxx",
		loadChildren: () =>  import("../app/punch/punch.routes").then(r => r.PUNCH_ROUTES),
	},
	 
];
