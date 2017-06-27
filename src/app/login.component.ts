import { Component, Input } from '@angular/core';
import { AuthUser } from './auth.user';
import { CredentialsService } from './credentials.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	constructor(private credentialsService: CredentialsService, private router: Router, private authService: AuthService) {
		if (authService.isLoggedIn) {
			this.router.navigateByUrl('/dashboard');
		}
	}
	title = 'Login';
	user: AuthUser = {
		name: 'admin',
		password: 'admin'
	}
	loginUser(userData: AuthUser): void {
		this.authService.login(userData)
			.then(() => {
				if (this.authService.isLoggedIn) {
					this.router.navigateByUrl('/dashboard');
				}
			})
			.catch((e) => console.warn(e));
	}
}
