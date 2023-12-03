import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment} from "../environments/environment";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterModule} from "./footer/footer.module";
import {HeaderModule} from "./header/header.module";
import {LoggerModule, NgxLoggerLevel, TOKEN_LOGGER_SERVER_SERVICE} from 'ngx-logger';
import {ServerCustomisedService} from "./utility/ServerCustomisedService";
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
	declarations: [
		AppComponent,
  InvoiceComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HeaderModule,
		FooterModule,
		HttpClientModule,
		LoggerModule.forRoot(
			{
			serverLoggingUrl: `${environment.serverLoggingUrl}`,
			level: NgxLoggerLevel.INFO,
			serverLogLevel: NgxLoggerLevel.ERROR,
			disableConsoleLogging: false,
			withCredentials: true},
			{
			serverProvider: {
				provide: TOKEN_LOGGER_SERVER_SERVICE, useClass: ServerCustomisedService
			}}
		)
	],
	bootstrap: [AppComponent],
	//TODO - to change URL
	// providers:[{provide: APP_BASE_HREF, useValue: '/mypath'}]
	//also change <href> in index.html
})
export class AppModule {
}
