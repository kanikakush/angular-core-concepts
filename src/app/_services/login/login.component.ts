import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_auth-services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomToolTipDirective } from '../../_ui-utility/custom-directive/custom-tool-tip.directive';
import { AutoUnsubscribe } from '../../custom-decorator/auto-unsubscribe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, CustomToolTipDirective],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
@AutoUnsubscribe // using custom decorator
export class LoginComponent implements OnDestroy {
 email = '';
  password = '';
  errorMessage = '';
 private subscription!: Subscription; // store subscription
  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any) {
    if (form.invalid) {
      return;
    }
    this.subscription =this.authService.login(this.email, this.password).subscribe({
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
  //manual way of cleaning up the memory
    ngOnDestroy(): void {
   if (this.subscription) {
      this.subscription.unsubscribe();
      console.log('Login subscription cleaned up');
    }
  }
}
