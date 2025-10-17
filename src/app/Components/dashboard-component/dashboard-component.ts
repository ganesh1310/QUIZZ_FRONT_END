import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SharedServices } from '../../Services/shared-services';
import { LoaderService } from '../../Services/loader.service';
import { UserPannel } from "./user-pannel/user-pannel";
import { AdminPannel } from "./admin-pannel/admin-pannel";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [UserPannel, AdminPannel , CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  title = '';
  role: String = '';
  activePanel: 'ADMIN' | 'USER' | null = null;
  constructor(
    private sharedService: SharedServices,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.role = localStorage.getItem('userRole') || '';
    setTimeout(() => {
      this.loaderService.show();
    });
    this.sharedService.getAccessByJwt().subscribe({
      next: (res) => {
        console.log(res);
        this.title = res;
        this.loaderService.hide();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.loaderService.hide();
      },
    });
  }

  setPanel(panel: 'ADMIN' | 'USER') {
    this.activePanel = panel;
  }
}
