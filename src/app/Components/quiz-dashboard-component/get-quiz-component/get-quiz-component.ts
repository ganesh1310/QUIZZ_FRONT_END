
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-quiz-component',
  standalone: true,
  imports: [],
  templateUrl: './get-quiz-component.html',
  styleUrl: './get-quiz-component.scss'
})
export class GetQuizComponent {
  quizzes = [
    { id: 31, title: 'Angular', description: 'Test your Angular knowledge.' },
    { id: 32, title: 'Java', description: 'Test your Java skills.' },
    { id: 33, title: 'Spring Boot', description: 'Test your Spring Boot expertise.' },
    { id: 34, title: 'Basic Angular 5', description: 'Test your Basic Angular 5 abilities.' },
    { id: 35, title: 'Basic Java 5', description: 'Test your Basic Java 5 abilities.' },
    { id: 36, title: 'Basic Spring Boot 5', description: 'Test your Basic Spring Boot 5 abilities.' },
    
    ];

  constructor(private router: Router) {}

  goToQuiz(quizId: number) {
    this.router.navigate(['/viewQuiz', quizId]);
  }
}
