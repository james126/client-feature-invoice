import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {Router, Routes} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {NgZone} from '@angular/core';
import {Location} from '@angular/common';
import {NGXLogger} from "ngx-logger";
import {NGXLoggerMock} from "ngx-logger/testing";
import {AdminComponent} from "../admin/admin.component";
import {CustomerComponent} from "../customer/customer.component";
import {IndexComponent} from "../index/index.component";
import {LoginComponent} from "../login/login.component";
import {HeaderComponent} from './header.component';
import {LogoutService} from "./service/logout.service";

describe('HeaderComponent', () => {
	let fixture: ComponentFixture<HeaderComponent>;
	let router: Router;
	let location: Location;
	let zone: NgZone;

	//Change login, admin, customer from lazy to eagerly loaded
	const routes: Routes = [
		{path: 'index', redirectTo: '', pathMatch: 'full'},
		{path: '', component: IndexComponent},
		{path: 'index#about', component: IndexComponent},
		{path: 'index#services', component: IndexComponent},
		{path: 'index#contact.ts', component: IndexComponent},
		//lazy loading:
		{path: 'login', component: LoginComponent},
		{path: 'admin', component: AdminComponent},
		{path: 'customer', component: CustomerComponent},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
			providers: [LogoutService, {provide: NGXLogger, useClass: NGXLoggerMock}],
			declarations: [HeaderComponent]
		}).compileComponents();
	});

	beforeEach(fakeAsync(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		router = TestBed.get(Router);
		location = TestBed.get(Location);
		zone = TestBed.get(NgZone);
		tick();
		fixture.detectChanges();
	}));

	//FIXME doesn't work
	it('can navigate to login', fakeAsync(() => {
		zone.run(() => {

			const links = fixture.debugElement.queryAll(By.css('a'));
			const home = links[4];
			home.nativeElement['skipLocationChange'] = "false";

			expect(home.nativeElement.innerHTML).toEqual("Login")
			home.triggerEventHandler('click', {button: 0});
			tick();
			fixture.detectChanges();

			fixture.whenStable().then(() => {
				expect(location.path()).toEqual('');
			});
		});
	}))
});
