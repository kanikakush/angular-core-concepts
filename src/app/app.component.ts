import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './_auth-services/auth-service.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './_services/login/login.component';
import { RegisterComponent } from './_services/register/register.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    LandingPageComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-core-concepts';
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
