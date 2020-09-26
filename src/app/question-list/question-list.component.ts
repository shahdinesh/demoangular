import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: any;

  constructor(
    private questionService: QuestionService, 
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe(
      data => {
        this.messageService.add(`Successfully listed question.`);
        this.questions = data;
      },
      err => {
      }
    );
  }

  deleteQuestion(id) {
    if(confirm("Are sure you want to delete??")) {
      this.questionService.deleteQuestion(id).subscribe(
        data => {
          this.messageService.add(`Successfully deleted question.`);
          this.getQuestions();
        },
        err => {
        }
      );
    }
  }

}
