import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NGXLogger} from "ngx-logger";
import {catchError, EMPTY, map, throwError} from "rxjs";
import {environment} from '../../../environments/environment';
import {Contact} from "../dto/contact";

@Injectable()
export class ContactFormService {
	private url = environment.apiForm;

	constructor(private http: HttpClient, private logger: NGXLogger) {
	}

	submitContactForm(formValues: Contact) {
		// const body = [
		// 	formValues,
		// 	{ "token": token }
		// ];

		return this.http.post(this.url, formValues, {
			headers: new HttpHeaders({'Content-Type': 'application/json'}),
			observe: 'response',
		}).pipe(map((res) => {
				this.logger.log('Submitted contact form ' + res.status);
			}),catchError((error: HttpErrorResponse) => {
				this.logger.error(error);
				return EMPTY;
			}))
	}
}
