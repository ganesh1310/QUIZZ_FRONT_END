import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, single, Subject } from 'rxjs';
import { RxJsOperators } from './rx-js-operators';
import { JWT_STORAGE_KEY, JwtToken } from '../Components/Quiz_Custom_Token/jwt-token';

@Injectable({
  providedIn: 'root',
})
export class SharedServices {
  constructor(
    private httpClient: HttpClient,

    @Inject(JWT_STORAGE_KEY) private jwtToken : JwtToken

    //use of forwardRef() can also be done here to resolve circular dependencies
    // private rxJsOperators: RxJsOperators
  ) {}

  // public isLoggedInSubject = new BehaviorSubject<boolean>(false);
  // isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // public userRoleSubject = new BehaviorSubject<String>('');
  // userRole$ = this.userRoleSubject.asObservable();

  //implemeting signals over subjects
  public isLoggedInSignal = signal<boolean>(false);
  public userRoleSignal = signal<string>('');

  /*
    Rxjs Observables Vs Subjects Vs Behaviour_Subjects

    1.Observable:
      - Represents a stream of data that can be observed.
      - Cold by default, meaning they don't emit values until subscribed to.
      - Unicast: Each subscriber gets its own independent execution.
      - Cannot hold a current value.

    2.Subjects:
      - A special type of Observable that allows multicasting to multiple observers.
      - Hot by default, meaning they emit values regardless of subscriptions.
      - Can be used to emit values to multiple subscribers.
      - Does not hold a current value.

    3.Behavior Subjects:
      - A type of Subject that requires an initial value and emits its current value to new subscribers.
      - Hot by default, similar to Subjects.
      - Can be used to emit values to multiple subscribers.
      - Holds a current value that can be accessed synchronously.

  */

    public isSubmitted = new Subject<Boolean>();
    isSubmitted$ = this.isSubmitted.asObservable();

    public getRole = new BehaviorSubject<String>('');
    getRole$ = this.getRole.asObservable();

    updateObservables(){
      this.isSubmitted.next(true);
      this.getRole.next('Admin');
    }

    extractDataFromObservables(){
      this.isSubmitted$.subscribe((value)=>{
        console.log("Is Submitted Value: ", value);
      });

      this.getRole$.subscribe((role)=>{
        console.log("Role Value: ", role);
      });
    }

  authCommonUrl = 'http://localhost:8083/';
  questionCommonUrl = 'http://localhost:8765/question/';
  quizCommonUrl = 'http://localhost:8765/quiz/';

  signUp(data: any) : Observable<any> {
    return this.httpClient.post(this.authCommonUrl + 'signup', data, {
      responseType: 'text',
    });
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(this.authCommonUrl + 'login', data, {
      responseType: 'text',
    });
  }

  addQuestion(data: any) : Observable<any> {
    return this.httpClient.post(this.questionCommonUrl + 'add', data, {
      responseType: 'text',
    });
  }

  getAllQuestions() : Observable<any> {
    return this.httpClient.get(this.questionCommonUrl + 'allquestions').pipe(
      retry(2),
      catchError(err =>{
        throw 'Error in getAllQuestions: ' + err;
      })
    );
  }

  getQuestionsByCategory(category: string) : Observable<any> {
    return this.httpClient.get(
      this.questionCommonUrl + 'category/' + encodeURIComponent(category)
    );
  }

  createQuiz(data: any): Observable<any> {
    return this.httpClient.post(this.quizCommonUrl + 'create', data, {
      responseType: 'text',
    });
  }

  getQuizById(quizId: number): Observable<any> {
    return this.httpClient.get(this.quizCommonUrl + 'get/' + quizId);
  }

  getAllQuizzes(): Observable<any> {
    return this.httpClient.get(this.quizCommonUrl + 'getAll');
  }

  submitQuiz(quizId: number, answers: any) {
    return this.httpClient.post(
      this.quizCommonUrl + 'submit/' + quizId,
      answers
    );
  }

  getAccessByJwt() {
    const token = localStorage.getItem(this.jwtToken.jwtKey);// use of injected token
    console.log("Using JWT Key: ", this.jwtToken.jwtKey);
    // const token = localStorage.getItem('jwtToken'); // or 'access_token' based on your storage key
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

  getAllFeedback() : Observable<any> {
    return this.httpClient.get(this.quizCommonUrl + 'getAllFeedbacks');
  }
}
