import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }       from './app.component';
import { RegisterComponent }  from './register.component';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent } from './login.component';
import { EditComponent } from './edit.component';
import { CredentialsService } from './credentials.service';
import { AuthService } from './auth.service';
import { RouterModule }   from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([   
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
	    {
        path: 'edit/:name',
        component: EditComponent
	    }
    ])
  ],
  declarations: [  
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent,
    DashboardComponent	 
  ],
  providers: [
    CredentialsService,
	  AuthService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }