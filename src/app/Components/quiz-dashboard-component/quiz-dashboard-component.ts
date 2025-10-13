import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedServices } from '../../Services/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-dashboard-component',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './quiz-dashboard-component.html',
  styleUrls: ['./quiz-dashboard-component.scss'],
  standalone : true
})
export class QuizDashboardComponent implements OnInit{
  constructor(
    private sharedServices : SharedServices
  ){}
  userRole : string | null | undefined;

  ngOnInit(): void {
    this.sharedServices.userRole$.subscribe((role : any)=>{
      this.userRole = role;
    })
  }

}
