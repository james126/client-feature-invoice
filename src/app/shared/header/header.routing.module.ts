import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "../../index/index.component";
import {LoginComponent} from "../../login/login.component";

const routes: Routes = [
	{path: '', redirectTo: 'index', pathMatch: 'full'},
	{path: 'index', component: IndexComponent},
	{path: 'index#about', component: IndexComponent},
	{path: 'index#services', component: IndexComponent},
	{path: 'index#contact', component: IndexComponent},
	{path: 'login', component: LoginComponent}
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