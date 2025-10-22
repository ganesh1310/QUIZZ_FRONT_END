import { Component, Inject, Self, SkipSelf } from '@angular/core';
import { RxJsOperators } from '../../Services/rx-js-operators';
import { LoaderService } from '../../Services/loader.service';
import { SharedServices } from '../../Services/shared-services';
import { DEFAULT_QUIZ_CONFIG, QuizConfig } from '../../Components/Quiz_Custom_Token/quiz-config';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { noSpecialCharsValidator } from '../../Custom_Validators/no-special-chars';
import { isEmailRegistered } from '../../Custom_Validators/isEmailRegsitered';

const quizSettings: QuizConfig = {
  timeLimit: 30,
  difficulty: 'medium',
  numberOfQuestions: 10,
  category: 'science'
};

@Component({
  selector: 'app-owner-information',
  imports: [FormsModule , ReactiveFormsModule , CommonModule],
  templateUrl: './owner-information.html',
  styleUrl: './owner-information.scss',
  providers: [LoaderService, {provide : DEFAULT_QUIZ_CONFIG , useValue : quizSettings}], //local injector for Self() 
  standalone: true
})
export class OwnerInformation {
  ownerDataForm : FormGroup;
  constructor(
    @Self() private LoaderService: LoaderService, //checks dependency only in local injector

    @SkipSelf() private SharedService : SharedServices, //checks dependency only in parent injector(module level) avoiding local injector

    @Inject(DEFAULT_QUIZ_CONFIG) public QuizConfig : QuizConfig, //injecting custom token

    private fb : FormBuilder
  ){ 
    console.log(QuizConfig.timeLimit);
    
    this.ownerDataForm = this.fb.group({
      ownerName : ['' , [Validators.required , noSpecialCharsValidator]],
      ownerEmail : ['' , [Validators.required , Validators.email] , [isEmailRegistered]],
      ownerAddress : ['' , Validators.required],
      ownerContact : this.fb.array([
        this.fb.control('' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]),
        this.fb.control('' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10)])
      ])
    });
  }

  get ownerContactControls() : FormArray {
    return this.ownerDataForm.get('ownerContact') as FormArray;
  }

  addContact() {
    this.ownerContactControls.push(this.fb.control('' , [Validators.required , Validators.minLength(10) , Validators.maxLength(10)]));
  }

  removeContact(index: number) {
    this.ownerContactControls.removeAt(index);
  }

  onSubmit(){
    if(this.ownerDataForm.valid){
      console.log(this.ownerDataForm.value);
    }
  }

}
