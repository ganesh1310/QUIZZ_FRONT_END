import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard-component/dashboard-component';
import { CreateQuizComponent } from './Components/quiz-dashboard-component/create-quiz-component/create-quiz-component';
import { AddQuestionsComponent } from './Components/questions-dashboard/add-questions-component/add-questions-component';
import { QuestionsDashboard } from './Components/questions-dashboard/questions-dashboard';
import { ViewQuestionsByCategoryComponent } from './Components/questions-dashboard/view-questions-by-category-component/view-questions-by-category-component';
import { GetAllQuestionsComponent } from './Components/questions-dashboard/get-all-questions-component/get-all-questions-component';
import { QuizDashboardComponent } from './Components/quiz-dashboard-component/quiz-dashboard-component';
import { GetQuizComponent } from './Components/quiz-dashboard-component/get-quiz-component/get-quiz-component';
import { ViewQuizComponent } from './Components/quiz-dashboard-component/view-quiz-component/view-quiz-component';
import { ViewAllQuizzesComponent } from './Components/quiz-dashboard-component/view-all-quizzes-component/view-all-quizzes-component';
import { SingupComponent } from './Components/singup-component/singup-component';
import { LoginComponent } from './Components/login-component/login-component';
import { AdminDashboard } from './Components/Admin-Dashboard/admin-dashboard/admin-dashboard';
import { authGuard } from './Components/Auth-Service/auth-guard';
import { roleGuard } from './Components/Auth-Service/role-guard';
import { UnauthorizedUser } from './Components/unauthorized-user/unauthorized-user';

export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent , canActivate: [authGuard]},
  { path: 'QuestionsDashboard', component: QuestionsDashboard , canActivate: [authGuard]},
  { path: 'addQuestion', component: AddQuestionsComponent , canActivate: [authGuard]},
  { path: 'viewAllQuestions', component: GetAllQuestionsComponent , canActivate: [authGuard]},
  { path: 'viewQuestionsByCategory', component: ViewQuestionsByCategoryComponent , canActivate: [authGuard]},
  { path: 'createQuiz', component: CreateQuizComponent , canActivate: [authGuard]},
  { path: 'QuizDashboard', component: QuizDashboardComponent , canActivate: [authGuard]},
  { path: 'getQuiz', component: GetQuizComponent , canActivate: [authGuard]},
  { path: 'addQuestion', component: AddQuestionsComponent , canActivate: [authGuard]},
  { path: 'viewQuiz/:id', component: ViewQuizComponent , canActivate: [authGuard]},
  { path: 'viewAllQuizzes', component: ViewAllQuizzesComponent , canActivate: [authGuard]},
  { path: 'signup', component: SingupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized' , component : UnauthorizedUser},

  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'ADMIN' },
  },
  { path: '**', redirectTo: '/home' },
];
