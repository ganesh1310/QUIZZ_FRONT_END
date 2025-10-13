import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServices } from '../../Services/shared-services';

@Component({
  selector: 'app-singup-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './singup-component.html',
  styleUrl: './singup-component.scss'
})
export class SingupComponent {
  username = '';
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  constructor(private sharedService: SharedServices, private router: Router) {}

  validateEmail(email: string): boolean {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  onSubmit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (!this.username.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.errorMsg = 'Please enter a valid email address.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }
    this.loading = true;
    const payload = {
      username: this.username,
      password: this.password,
      email: this.email
    };
    this.sharedService.signUp(payload).subscribe({
      next: (res) => {
        this.successMsg = 'Signup successful! Redirecting to login...';
        this.sharedService.isLoggedInSubject.next(true);
        setTimeout(() => this.router.navigate(['/login']), 1500);
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Signup failed. Please try again.';
        this.loading = false;
        this.sharedService.isLoggedInSubject.next(false);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
