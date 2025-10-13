
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedServices } from '../../../Services/shared-services';

@Component({
  selector: 'app-create-quiz-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-quiz-component.html',
  styleUrl: './create-quiz-component.scss'
})
export class CreateQuizComponent {
  quizForm: FormGroup;
  categories = ['Angular', 'Java', 'Spring Boot', 'JavaScript'];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServices
  ) {
    this.quizForm = this.fb.group({
      categoryName: ['', Validators.required],
  numQuestions: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.quizForm.valid) {
      this.sharedService.createQuiz(this.quizForm.value).subscribe({
        next: (response) => {
          alert('Quiz Created Successfully!\n' + JSON.stringify(response, null, 2));
          this.quizForm.reset();
        },
        error: (error) => {
          console.error('Error creating quiz:', error);
          alert('Failed to create quiz. Please try again later.');
        }
      });
    }
  }
}
