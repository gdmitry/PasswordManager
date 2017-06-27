import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from './auth.user';
import { ActivatedRoute, Params } from '@angular/router';
import { CredentialsService } from './credentials.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'edit',
	templateUrl: './edit.component.html'
})
export class EditComponent {
	constructor(
		private credentialsService: CredentialsService,
		private route: ActivatedRoute,
		private router: Router,
		private location: Location,
		private authService: AuthService
	) {
		if (!authService.isLoggedIn) {
			this.router.navigateByUrl('/login');
		}
	}

	title = 'Edit password';
	@Input() user: AuthUser;

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.credentialsService.getCredential(params['name']))
			.subscribe(user => {
				this.user = user;
			});
	}

	saveUser(user: AuthUser): void {
		this.credentialsService.updateCredential(user)
			.then(() => this.goBack())
			.catch((e) => console.warn(e));
	}

	deleteUser(user: AuthUser): void {
		this.credentialsService.deleteCredential(user.name)
			.then(() => this.goBack());
	}

	goBack(): void {
		this.location.back();
	}
}
