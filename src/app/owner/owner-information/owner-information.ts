import { Component, Inject, Self, SkipSelf } from '@angular/core';
import { RxJsOperators } from '../../Services/rx-js-operators';
import { LoaderService } from '../../Services/loader.service';
import { SharedServices } from '../../Services/shared-services';
import { DEFAULT_QUIZ_CONFIG, QuizConfig } from '../../Components/Quiz_Custom_Token/quiz-config';

const quizSettings: QuizConfig = {
  timeLimit: 30,
  difficulty: 'medium',
  numberOfQuestions: 10,
  category: 'science'
};

@Component({
  selector: 'app-owner-information',
  imports: [],
  templateUrl: './owner-information.html',
  styleUrl: './owner-information.scss',
  providers: [LoaderService, {provide : DEFAULT_QUIZ_CONFIG , useValue : quizSettings}], //local injector for Self() 
  standalone: true
})
export class OwnerInformation {
  constructor(
    @Self() private LoaderService: LoaderService, //checks dependency only in local injector

    @SkipSelf() private SharedService : SharedServices, //checks dependency only in parent injector(module level) avoiding local injector

    @Inject(DEFAULT_QUIZ_CONFIG) public QuizConfig : QuizConfig, //injecting custom token
  ){ 
    console.log(QuizConfig.timeLimit);
  }
}
