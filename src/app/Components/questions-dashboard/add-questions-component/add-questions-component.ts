
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SharedServices } from '../../../Services/shared-services';
import { Highlight } from '../../../Custom_Directives/highlight';

@Component({
  selector: 'app-add-questions-component',
  standalone: true,
  imports: [ReactiveFormsModule , Highlight],
  templateUrl: './add-questions-component.html',
  styleUrl: './add-questions-component.scss'
})
export class AddQuestionsComponent {
  questionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedServices
  ) {
    this.questionForm = this.fb.group({
      questionTitle: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      rightAnswer: ['', Validators.required],
      difficultylevel: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      this.sharedService.addQuestion(this.questionForm.value).subscribe((response) => {
        console.log('Question added successfully', response);
        alert('Question added successfully');
        this.questionForm.reset();
      }, (error) => {
        console.error('Error adding question', error);
        alert('Error adding question');
      });
    }
  }
}
