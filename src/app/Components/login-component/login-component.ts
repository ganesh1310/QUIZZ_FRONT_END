import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServices } from '../../Services/shared-services';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMsg = '';
  loading = false;

  constructor(
    private sharedService: SharedServices, 
    private router: Router,
    private loader: LoaderService
  ) {}

  onSubmit() {
    this.errorMsg = '';
    if (!this.username.trim() || !this.password.trim()) {
      this.errorMsg = 'Username and password are required.';
      return;
    }
    this.loader.show();
    this.loading = true;
    const payload = {
      username: this.username,
      password: this.password,
    };
    this.sharedService.login(payload).subscribe({
      next: (res: any) => {
        if (res) {
          console.log('Login successful', res);
          const response = JSON.parse(res);
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('userRole', response.role);
          this.sharedService.isLoggedInSubject.next(true);
          this.sharedService.userRoleSubject.next(response.role);
          this.loader.hide();
          this.loading = false;
          this.router.navigate(['/home']);

        } else {
          this.errorMsg = 'Invalid response from server.';
        }
        this.loader.hide();

      },
      error: (err: any) => {
        this.errorMsg =
          err?.error?.message || 'Login failed. Please try again.';
        this.loader.hide();
        this.loading = false;
        this.sharedService.isLoggedInSubject.next(false);
      },
    });
  }
}
