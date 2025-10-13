import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedServices } from '../../../Services/shared-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-view-quiz-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-quiz-component.html',
  styleUrl: './view-quiz-component.scss',
})
export class ViewQuizComponent implements OnInit {
  quizId: number | null = null;
  quizData: any = null;
  loading = true;
  errorMsg = '';
  userAnswers: string[] = [];
  score: any = 0;
  showScore: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedServices,
    private cdr: ChangeDetectorRef,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    if (this.quizId) {
      this.sharedService.getQuizById(this.quizId).subscribe({
        next: (data: any) => {
          console.log('Quiz response:', data);
          // Flatten array-of-arrays to array of question objects
          if (Array.isArray(data) && Array.isArray(data[0])) {
            this.quizData = data.map((arr) => arr[0]);
          } else if (Array.isArray(data)) {
            this.quizData = data;
          } else if (data && typeof data === 'object') {
            this.quizData = [data];
          } else {
            this.quizData = [];
          }
          // Initialize userAnswers as an array with empty strings for each question
          this.userAnswers = Array(this.quizData.length).fill('');
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.errorMsg = 'Failed to load quiz.';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.errorMsg = 'Invalid quiz ID.';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  submitQuiz() {
  // Check if all questions are answered
  const allAnswered = this.userAnswers.length === this.quizData.length &&
                      this.userAnswers.every(answer => answer !== '' && answer !== undefined);

  if (!allAnswered) {
    alert('Please attempt all questions before submitting the quiz.');
    return;
  }

  // Build payload: [{ questionId, selectedOption }]
  const payload = this.quizData.map((question: any, idx: number) => {
    const optionKeys = ['option1', 'option2', 'option3', 'option4'];
    const selectedOptionKey = optionKeys[Number(this.userAnswers[idx])];
    return {
      id: question.id || question.questionId,
      response: question[selectedOptionKey],
    };
  });

  console.log('Quiz submit payload:', payload);
  this.loaderService.show();

  this.sharedService.submitQuiz(this.quizId!, payload).subscribe({
    next: (response) => {
      this.loaderService.hide();
      this.score = response;
      this.showScore = true;
      // Optionally show success message
    },
    error: (error) => {
      console.error('Error submitting quiz:', error);
      this.loaderService.hide();
    },
  });
}

closeScorePopup() {
  this.showScore = false;
  this.userAnswers = new Array(this.quizData.length).fill(null);  
}
}