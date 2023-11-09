import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {OwlOptions} from 'ngx-owl-carousel-o';
import {environment} from "../../environments/environment";
import {ContactFormService} from "./service/contact-form.service";
import {Contact} from './dto/contact';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
	selector: 'mgm-index',
	templateUrl: './index.component.html',
	providers: [ContactFormService]
})
export class IndexComponent implements OnInit  {
	@ViewChild('recaptcha', {static: false, read: RecaptchaComponent}) repactcha?: RecaptchaComponent;
	siteKey: string = environment.siteKey;
	captchaResponse: boolean = false;
	service: ContactFormService;
	router: Router;
	submitted: boolean = false;
	contactForm!: FormGroup;

	formValues = {
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		address_line1: '',
		address_line2: '',
		message: ''
	};

	customOptions: OwlOptions = {
		loop: true,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplaySpeed: 1000,
		autoplayHoverPause: true,
		mouseDrag: false,
		touchDrag: false,
		pullDrag: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 1
			},
			940: {
				items: 1
			}
		}
	}

	constructor(service: ContactFormService, router: Router) {
		this.service = service;
		this.router = router;
	}

	ngOnInit(): void {
		this.contactForm = new FormGroup({
			first_name: new FormControl(this.formValues.first_name, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
				Validators.pattern('[^ ]+'),
			]),
			last_name: new FormControl(this.formValues.last_name, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
				Validators.pattern('[^ ]+'),
			]),
			email: new FormControl(this.formValues.email, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
				Validators.email
			]),
			phone: new FormControl(this.formValues.phone, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(30),
				Validators.pattern('[^ ]+'),
			]),
			address_line1: new FormControl(this.formValues.address_line1, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(100),
			]),
			address_line2: new FormControl(this.formValues.address_line2, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(100),
			]),
			message: new FormControl(this.formValues.message, [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(1000),
			])
		});
	}

	submitCaptcha(captchaResponse: string) {
		this.service.submitRecaptcha(captchaResponse).subscribe({
			next: (data) => {
				this.captchaResponse = true;
			}, error: (err) => {
				//allow form submission anyway - errors are logged
				this.captchaResponse = true;
			}
		});
	}

	submitForm() {
		setTimeout(() => {
			document.getElementById("submit-button")?.blur();
		}, 500);

		if (this.contactForm.valid && this.captchaResponse) {
			const contact = new Contact();
			contact.first_name = this.contactForm.get('first_name')!.value;
			contact.last_name = this.contactForm.get('last_name')!.value;
			contact.email = this.contactForm.get('email')!.value;
			contact.phone = this.contactForm.get('phone')!.value;
			contact.address_line1 = this.contactForm.get('address_line1')!.value;
			contact.address_line2 = this.contactForm.get('address_line2')!.value;
			contact.message = this.contactForm.get('message')!.value;

			this.service.submitContactForm(contact).subscribe({
				next: (data) => {
				    this.captchaResponse = false;
					this.repactcha?.reset();
					this.resetForm()
				}, error: (err) => {
					this.submitted = true;
				}
			});
		}
	}

	resetForm() {
		this.contactForm.reset();
		this.submitted = false;
		this.router.navigate(['/index'], {skipLocationChange: true});
	}

	get first_name() {
		return this.contactForm.get('first_name');
	}

	get last_name() {
		return this.contactForm.get('last_name');
	}

	get email() {
		return this.contactForm.get('email');
	}

	get phone() {
		return this.contactForm.get('phone');
	}

	get address_line1() {
		return this.contactForm.get('address_line1');
	}

	get address_line2() {
		return this.contactForm.get('address_line2');
	}

	get message() {
		return this.contactForm.get('message');
	}
}
