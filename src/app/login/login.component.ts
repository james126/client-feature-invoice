
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RecaptchaComponent} from "ng-recaptcha";
import {environment} from "../../environments/environment";
import {Contact} from "../admin/dto/contact";
import {Login} from "./dto/login";
import {LoginService} from "./service/login.service";

@Component({
	selector: 'mgm-login',
	templateUrl: './login.component.html',
	providers: [LoginService]
})
export class LoginComponent implements OnInit {
	@ViewChild('recaptcha', {static: false, read: RecaptchaComponent}) repactcha?: RecaptchaComponent;
	siteKey: string = environment.siteKey;
	captchaResponse: boolean = false;
	router: Router;
	loginForm!: FormGroup;
	formValues = {username: '', password: ''};
	submitted: boolean = false;
	invalidCredentials: boolean = false;
	contact!: Contact
	service: LoginService


	constructor(router: Router, service: LoginService) {
		this.router = router;
		this.service = service;
	}

	ngOnInit(): void {
		this.loginForm = new FormGroup({
			username: new FormControl(this.formValues.username, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
				Validators.pattern('[^ ]+'), //no whitespace
			]),
			password: new FormControl(this.formValues.password, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(30),
				Validators.pattern('[^ ]+'),
			])
		});
	}

	get username() {
		return this.loginForm.get('username');
	}

	get password() {
		return this.loginForm.get('password');
	}

	onSubmit() {
		setTimeout(() => {
			document.getElementById("submit-button")?.blur();
		}, 1000);

		if (this.loginForm.valid) {
			if (this.loginForm.valid && this.captchaResponse){
				const username: string = this.loginForm.get('username')!.value;
				const password: string = this.loginForm.get('password')!.value;
				const login = new Login(username, password);

				this.service.submitLogin(login).subscribe({
					next: (data) => {
						this.router.navigate(['/admin'], { state : this.service.getContact(), skipLocationChange: true});
					}, error: (error) => {
						this.submitted = true;
						this.invalidCredentials = true;
						this.repactcha?.reset();
					}
				});
			}
		}
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

}
