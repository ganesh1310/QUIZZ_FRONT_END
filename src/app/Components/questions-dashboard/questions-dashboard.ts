
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedServices } from '../../Services/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questions-dashboard',
  standalone: true,
  imports: [RouterLink, RouterLinkActive , CommonModule],
  templateUrl: './questions-dashboard.html',
  styleUrl: './questions-dashboard.scss'
})
export class QuestionsDashboard implements OnInit {
  constructor(
    private sharedServices : SharedServices
  ){}

  userRole : string | null | undefined;

  ngOnInit(): void {
    this.sharedServices.userRole$.subscribe((userRole : any)=>{
      this.userRole = userRole;
    });
    console.log(this.userRole);
  }
}
