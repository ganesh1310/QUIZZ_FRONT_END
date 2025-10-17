import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoaderComponent } from './Components/Loader/loader.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './Services/loader.service';
import { SharedServices } from './Services/shared-services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  protected title = 'Quiz_App';
  constructor(
    public loaderService: LoaderService,
    public sharedService: SharedServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // this.sharedService.isLoggedInSubject.next(true);
      this.sharedService.isLoggedInSignal.set(true);
    }
    if (role) {
      // this.sharedService.userRoleSubject.next(role);
      this.sharedService.userRoleSignal.set(role);
    }
  }

  logout(): void {
    // Clear storage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');

    // Update login flag
    // this.sharedService.isLoggedInSubject.next(false);
    this.sharedService.isLoggedInSignal.set(false);

    // Navigate to login or landing page
    this.router.navigate(['/login']);
  }
  currentYear = new Date().getFullYear();
}
