import { Routes } from "@angular/router";
import { PunchHomeComponent } from "./punch-home.component";
import { PunchComponent } from "./punch/punch.component";
import { PunchListComponent } from "./punch-list/punch-list.component";

export const PUNCH_ROUTES: Routes = [{
	path: '',
	component: PunchHomeComponent,
	children: [
		{ path: '', pathMatch: 'full', redirectTo: 'punch' },
		{ path: 'punch', component: PunchComponent },
		{ path: 'punch-list', component: PunchListComponent },
		/*
		{ path: 'emp', 
			loadComponent: () => import("./emp/emp.component").then(mod => mod.EmpComponent)
		},
		{ path: 'emp2', 
			loadComponent: () => import("./emp2/emp2.component").then(mod => mod.Emp2Component)
		},
		{ path: 'customer', component: CustomerComponent },
		{ path: 'product', component: ProductComponent },
		{ path: 'punch', component: PunchComponent },
		*/
	]
}];