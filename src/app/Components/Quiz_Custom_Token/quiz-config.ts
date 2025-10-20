import { InjectionToken } from "@angular/core"

//interface for quiz configuration
export interface QuizConfig {
    timeLimit : number,
    difficulty  : string,
    numberOfQuestions : number,
    category : string
}

//default config token
export const DEFAULT_QUIZ_CONFIG = new InjectionToken<QuizConfig>('DEFAULT_QUIZ_CONFIG');
