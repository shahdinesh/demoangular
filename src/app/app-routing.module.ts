import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },

  { path: 'questions', component: QuestionListComponent },
  { path: 'addQuestions', component: QuestionsComponent },
  { path: 'editQuestions/:id', component: QuestionsComponent },

  { path: 'quiz', component: QuizComponent },

  { path: 'customers', component: CustomersComponent },
  { path: 'addCustomer', component: AddCustomerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
