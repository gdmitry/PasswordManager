import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
    constructor(private authService: AuthService, private router: Router) {
		if (authService.isLoggedIn) {
			this.router.navigateByUrl('/dashboard');
		} else {
			this.router.navigateByUrl('/login');
		}		
	 }
    title = 'Password manager';
}