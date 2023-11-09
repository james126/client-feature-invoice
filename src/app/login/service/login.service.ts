import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {NGXLogger} from "ngx-logger";
import {catchError, EMPTY, filter, map, throwError} from "rxjs";
import { environment } from '../../../environments/environment';
import {BodyParserService} from "../../utility/body-parser.service";
import {Login} from "../dto/login";
import {Contact} from "../dto/contact";

@Injectable()
export class LoginService {
	private url = environment.apiLogin;
	private apiRecaptcha = environment.apiRecaptcha;
    contact!: Contact
    bodyParserService: BodyParserService

    constructor(private http: HttpClient, private logger: NGXLogger, bodyParserService: BodyParserService) {
        this.bodyParserService = bodyParserService;
    }

    getContact() {
        return this.contact;
    }

	submitLogin(loginValues: Login) {
        return this.http.post<Contact>(this.url, loginValues, {
            observe: 'response',
            withCredentials: true
        }).pipe(map((res: HttpResponse<Contact>) => {
                this.contact = this.bodyParserService.processResponseBody(res);
                this.logger.log('Login successful ' + res.status);
            }
        ), catchError((error: HttpErrorResponse) => {
            this.logger.error(error);
            return EMPTY;
        }));
	}

	submitRecaptcha(token: String) {
		return this.http.post(this.apiRecaptcha, token, {
			headers: new HttpHeaders({'Content-Type': 'application/json'}),
			observe: 'response',
		}).pipe(map((res) => {
			this.logger.log('Submitted recaptcha ' + res.status);
			if (res.status != 200) {
				throw new Error("Error submitting recaptcha to server with response: " + res.status)
			}
		}),catchError((error: HttpErrorResponse) => {
			this.logger.error(error);
			return EMPTY;
		}))
	}
}
