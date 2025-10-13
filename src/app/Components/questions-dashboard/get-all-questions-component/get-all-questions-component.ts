
import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-questions-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-questions-component.html',
  styleUrl: './get-all-questions-component.scss'
})
export class GetAllQuestionsComponent {
  constructor(
    private sharedService: SharedServices,
    private cdr : ChangeDetectorRef
  ) {}

  questionList:any;

  ngOnInit() {
    this.sharedService.getAllQuestions().subscribe((data) => {
      this.questionList = data;
      setTimeout(() => this.cdr.detectChanges());
      console.log(this.questionList);
    }, (error) => {
      console.error('Error fetching questions', error);
    });
  }

  ngOnChanges() {
    // Handle changes here
  }
}
