import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  constructor(private httpClient: HttpClient) {}

  // public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // public userRoleSubject = new BehaviorSubject<String>('');
  // userRole$ = this.userRoleSubject.asObservable();

  //implemeting signals over subjects
  public isLoggedInSignal = signal<boolean>(false);
  public userRoleSignal = signal<string>('');

  authCommonUrl = 'http://localhost:8083/';
  questionCommonUrl = 'http://localhost:8765/question/';
  quizCommonUrl = 'http://localhost:8765/quiz/';

  signUp(data: any) {
    return this.httpClient.post(this.authCommonUrl + 'signup', data, {
      responseType: 'text',
    });
  }

  login(data: any) {
    return this.httpClient.post(this.authCommonUrl + 'login', data, {
      responseType: 'text',
    });
  }

  addQuestion(data: any) {
    return this.httpClient.post(this.questionCommonUrl + 'add', data, {
      responseType: 'text',
    });
  }

  getAllQuestions() {
    return this.httpClient.get(this.questionCommonUrl + 'allquestions');
  }

  getQuestionsByCategory(category: string) {
    return this.httpClient.get(
      this.questionCommonUrl + 'category/' + encodeURIComponent(category)
    );
  }

  createQuiz(data: any) {
    return this.httpClient.post(this.quizCommonUrl + 'create', data, {
      responseType: 'text',
    });
  }

  getQuizById(quizId: number) {
    return this.httpClient.get(this.quizCommonUrl + 'get/' + quizId);
  }

  getAllQuizzes() {
    return this.httpClient.get(this.quizCommonUrl + 'getAll');
  }

  submitQuiz(quizId: number, answers: any) {
    return this.httpClient.post(
      this.quizCommonUrl + 'submit/' + quizId,
      answers
    );
  }

  getAccessByJwt() {
    const token = localStorage.getItem('jwtToken'); // or 'access_token' based on your storage key
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.httpClient.get(this.authCommonUrl + 'getData', {
      headers,
      responseType: 'text',
    });
  }

  submitFeedback(data: any) {
    return this.httpClient.post(this.quizCommonUrl + 'feedback', data, {
      responseType: 'text',
    });
  }

  getAllFeedback() {
    return this.httpClient.get(this.quizCommonUrl + 'getAllFeedbacks');
  }
}
