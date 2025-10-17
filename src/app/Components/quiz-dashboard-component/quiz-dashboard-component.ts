import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedServices } from '../../Services/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-dashboard-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './quiz-dashboard-component.html',
  styleUrls: ['./quiz-dashboard-component.scss'],
  standalone : true,
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class QuizDashboardComponent implements OnInit{
  constructor(
    private sharedServices : SharedServices
  ){}
  userRole : string | null | undefined;

  ngOnInit(): void {
    // this.sharedServices.userRole$.subscribe((role : any)=>{
    //   this.userRole = role;
    // })

    // Using signals over observables
    this.userRole = this.sharedServices.userRoleSignal();
  }

}
