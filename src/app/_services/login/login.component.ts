import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_auth-services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomToolTipDirective } from '../../_ui-utility/custom-directive/custom-tool-tip.directive';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, CustomToolTipDirective],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any) {
    if (form.invalid) {
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: (res) =>{
        console.log(res.accessToken);
        console.log(res.refreshUser);
      },
      error: (err)=>{
        if(err.status == 401)
        {
           this.errorMessage = err.error?.message || 'Invalid username or password';
        }
        else {
        this.errorMessage = 'Something went wrong.';
      }
    }
    });
  }
}
