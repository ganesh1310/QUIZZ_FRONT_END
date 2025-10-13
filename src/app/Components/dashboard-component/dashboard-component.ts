import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../../Services/shared-services';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss'
})
export class DashboardComponent implements OnInit {

  title = '';
  constructor(
    private sharedService: SharedServices , 
    private Loader: LoaderService
  ) { }

  ngOnInit() {
    this.Loader.show();
    this.sharedService.getAccessByJwt().subscribe({
      next: (res) => {
        console.log(res);
        this.title = res;
        this.Loader.hide();
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.Loader.hide();
      }
    });
  }
}
