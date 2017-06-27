import { Component, Input } from '@angular/core';
import { AuthUser } from './auth.user';
import { CredentialsService } from './credentials.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Component({
	selector: 'register',
	templateUrl: './register.component.html'
})

export class RegisterComponent {
	constructor(
		private credentialsService: CredentialsService,
		private router: Router,
		private authService: AuthService,
		private location: Location
	) {
		if (!authService.isLoggedIn) {
			this.router.navigateByUrl('/login');
		}
	}
	title = 'Register';
	user: AuthUser = {
		name: '',
		password: ''
	}

	registerUser(user: AuthUser): void {
		if (!user.password || !user.name) {
			console.warn('Password and User name mustn\'t be empty');
			return;
		}
		this.credentialsService.saveCredential(user)
			.then(() => this.router.navigateByUrl('/dashboard'))
			.catch((e) => console.warn(e));
	}

	goBack(): void {
		this.location.back();
	}
}
