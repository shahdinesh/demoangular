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
  lastPage: number = 0;
  currentPage: number = 0;

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
    setTimeout(() => {
      this.paginate(1);
    }, 500);
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
        this.lastPage = data.last_page;
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
    if(pageno != this.currentPage) {
      this.getQuestions({
        category_id: this.searchForm.value.category_id,
        title: this.searchForm.value.title,
        pageno: pageno
      });
      setTimeout(() => {
        this.paginate(pageno);
      }, 500);
    }
  }

  paginate(current) {
    this.pages = [];
    if (current == null)
      current = 1;
    this.currentPage = current;

    // if(current > 1)
    //     console.log('prev');

    if (current < 5){
        for(var i=1; i<current; ++i)
          this.pages.push(i);
    }
    else {
        this.pages.push(1);
        this.pages.push('...');
        for(var i=current-2; i<current; ++i)
          this.pages.push(i);
    }

    this.pages.push(current);

    if (current > this.lastPage-4) {
        for(var j=current+1; j<=this.lastPage; ++j)
            this.pages.push(j);
    }
    else {
        for(var j=current+1; j<current+3; ++j)
            this.pages.push(j);
        this.pages.push('...');
        this.pages.push(this.lastPage);
    }

    // if (current < this.lastPage)
    //     console.log('next');
  }
}
