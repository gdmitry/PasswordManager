import { Component } from '@angular/core';
import { AuthUser } from './auth.user';
import { CredentialsService } from './credentials.service';
import { OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [CredentialsService]
})

export class DashboardComponent implements OnInit {
	constructor(private credentialsService: CredentialsService, private router: Router, private authService: AuthService) {
		if (!this.authService.isLoggedIn) {
			this.router.navigateByUrl('/login');
		}
	}

	title = 'Passwords';
	users: AuthUser[];

	getUsers(): void {
		this.credentialsService.getCredentials().then(users => this.users = users);
	}
	ngOnInit(): void {
		this.getUsers();
	}

	logout(): void {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

	revealPassword(event: any) {
		let target = event.target;

		if (target.classList.contains('password-hidden') ||
			target.classList.contains('password-revealed')) {
			target.parentElement.classList.toggle('selected');
		}
	}
}
