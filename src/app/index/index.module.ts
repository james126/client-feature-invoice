import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {RecaptchaModule} from "ng-recaptcha";
import {ContactFormService} from "./service/contact-form.service";
import {IndexComponent} from "./index.component";
import {CarouselModule} from 'ngx-owl-carousel-o';

@NgModule({
	declarations: [
		IndexComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,
		CarouselModule,
		RecaptchaModule
	],
	exports: [
		IndexComponent
	],
	providers: [ContactFormService]
})
export class IndexModule {
}
