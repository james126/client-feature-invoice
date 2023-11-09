import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "../index/index.component";

const routes: Routes = [
	{path: 'index', redirectTo: '', pathMatch: 'full'},
	{path: '', component: IndexComponent},
	{path: 'index#about', component: IndexComponent},
	{path: 'index#services', component: IndexComponent},
	{path: 'index#contact.ts', component: IndexComponent},
	//lazy loading:
	{path: 'login', loadChildren: () => import('../login/login.module').then(mod => mod.LoginModule)},
	{path: 'admin', loadChildren: () => import('../admin/admin.module').then(mod => mod.AdminModule)},
	{path: 'customer', loadChildren: () => import('../customer/customer.module').then(mod => mod.CustomerModule)},
];

@NgModule({
  imports: [
	  RouterModule.forChild(routes),
  ],
	exports : [
		RouterModule
	]
})
export class HeaderRoutingModule { }
