import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-view-all-quizzes-component',
  templateUrl: './view-all-quizzes-component.html',
  styleUrl: './view-all-quizzes-component.scss',
  imports: [CommonModule],
  standalone: true
})
export class ViewAllQuizzesComponent implements OnInit {
  quizzes: any;
  constructor(
    private sharedService: SharedServices,
    private loaderService: LoaderService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sharedService.getAllQuizzes().subscribe((data) => {
      console.log(data);
      setTimeout(() => this.cdr.detectChanges());
      this.quizzes = data;
    } , (error) => {
      console.error('Error fetching quizzes', error);
    });
  }
}
