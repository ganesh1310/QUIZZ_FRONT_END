
import { ChangeDetectorRef, Component } from '@angular/core';
import { SharedServices } from '../../../Services/shared-services';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Services/loader.service';

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
    private cdr : ChangeDetectorRef,
    private loaderService : LoaderService
  ) {}

  questionList:any;

  ngOnInit() {
    this.loaderService.show();
    this.sharedService.getAllQuestions().subscribe((data) => {
      this.questionList = data;
      setTimeout(() => this.cdr.detectChanges());
      console.log(this.questionList);
      this.loaderService.hide();
    }, (error) => {
      console.error('Error fetching questions', error);
      this.loaderService.hide();
    });
  }

  ngOnChanges() {
    // Handle changes here
  }
}
