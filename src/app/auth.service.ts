import { Injectable } from '@angular/core';
import { AuthUser } from './auth.user';
import { CredentialsService } from './credentials.service';
// import { Cookie } from 'ng2-cookies/ng2-cookies.js';

@Injectable()
export class AuthService {
	constructor(private credentialsService: CredentialsService) {
		this._isLoggedIn = !!JSON.parse(localStorage.getItem('authUser'));
	}

	private _isLoggedIn: boolean;

	login(user: AuthUser): Promise<boolean> {
		return this.credentialsService.getCredential(user.name)
			.then((credential) => {
				switch (true) {
					case credential && credential.password === user.password:
					case this.isAdminUser(user):
						this._isLoggedIn = true; break;
					default:
						this._isLoggedIn = false;
				}
				
				if (!this._isLoggedIn) {
					throw new Error('User name and password are incorrect.');
				}
				// Cookie.set('authorized', 'true', 1000);
				localStorage.setItem('authUser', JSON.stringify(user));
				return this.isLoggedIn;
			});
	}

	logout(): void {
		// Cookie.delete('authorized');
		localStorage.setItem('authUser', null);
		this._isLoggedIn = false;
	}

	isAdminUser(user: AuthUser): boolean {
		return user.name === 'admin' && user.password === 'admin';
	}

	get isLoggedIn(): boolean {
		// let authCookie = Cookie.get('authorized');
		// return authCookie === 'true';
		return this._isLoggedIn;
	}

	get authUser() {
		return JSON.parse(localStorage.getItem('authUser'));
	}
}