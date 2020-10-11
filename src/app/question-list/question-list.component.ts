import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  searchForm: FormGroup;
  categories: any;
  questions: any;
  pages = [];

  constructor(
    private formBuilder: FormBuilder, 
    private questionService: QuestionService, 
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      category_id: new FormControl(''),
      title: new FormControl(''),
    });
    this.getQuestions();

    this.questionService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
      }
    );
  }

  getQuestions(searchParam = null) {
    this.questionService.getQuestions(null, searchParam).subscribe(
      data => {
        this.messageService.add(`Successfully listed question.`);
        this.questions = data.data;
        this.createRange(data.last_page);
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

  search(pageno = null) {
console.log(pageno);
    this.getQuestions({
      category_id: this.searchForm.value.category_id,
      title: this.searchForm.value.title,
      pageno: pageno
    });
  }
  
  createRange(number) {
    this.pages = [];
    for(var i = 1; i <= number; i++){
       this.pages.push(i);
    }
  }

}
