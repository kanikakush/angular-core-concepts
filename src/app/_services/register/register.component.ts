import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { AuthService } from '../../_auth-services/auth-service.service';

@Component({
  selector: 'app-register',
   imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 roles = ['User', 'Admin', 'Manager'];
  genders = ['Male', 'Female', 'Other'];
  loading = false;
  successMessage = '';
  errorMessage = '';
   registerForm!: FormGroup;

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      subscribe: [false],
      skills: this.fb.array([])
    });
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  get skills(): FormArray {
    return this.registerForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
