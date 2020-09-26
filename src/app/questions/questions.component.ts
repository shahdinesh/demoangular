import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../services/question.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  registerForm: FormGroup;
  categories: any;
  id = this.route.snapshot.paramMap.get('id');
  constructor(
    private formBuilder: FormBuilder, 
    private questionService: QuestionService, 
    private messageService: MessageService,
    private router: Router,
    private route :ActivatedRoute
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      category_id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      true_index: new FormControl('', [Validators.required]),
      options: new FormArray([])
    });

    if (this.id !== null) {
      this.questionService.getQuestions(this.id).subscribe(
        data => {
          
          var true_index = '';
          data.answers.forEach((answer, index) => {
            var is_true = (answer.is_true == '1') ? index : '';
            if (answer.is_true == '1') {
              is_true = index;
              true_index = index;
            }
            this.addOption(answer.answer, String(is_true));
          });
          this.registerForm.patchValue({
            title: data.title,
            category_id: data.category_id,
            true_index: true_index
          });
        },
        err => {
        }
      );
    } else
      this.addOption();

    this.questionService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      err => {
      }
    );
  }

  get f() { return this.registerForm.controls; }
  get o() { return this.f.options as FormArray; }
  // get category_id() { return this.registerForm.get('category_id'); }
  // get title() { return this.registerForm.get('title'); }
  // get true_index() { return this.registerForm.get('true_index'); }

  addQuestion() {
    if(this.registerForm.valid) {
      this.questionService.saveQuestion(this.registerForm.value).subscribe(
        data => {
          this.messageService.add(`Successfully added question.`);
          this.router.navigate(['/questions']);
        },
        err => {
        }
      );
    } else
      console.log(this.registerForm.value);
  }
  updateQuestion() {
    if(this.registerForm.valid) {
      this.questionService.updateQuestion(this.registerForm.value, this.id).subscribe(
        data => {
          this.messageService.add(`Successfully updated question.`);
          this.router.navigate(['/questions']);
        },
        err => {
        }
      );
    } else
      console.log(this.registerForm.value);
  }

  changeTrueStatus(i) {
    this.registerForm.patchValue({
      true_index: i
    });
  }

  addOption(answer = '', is_true = '') {
    this.o.push(this.formBuilder.group({
      answer: new FormControl(answer, [Validators.required]),
      is_true: new FormControl(is_true)
    }));
  }
  removeOption(i) {
    this.o.removeAt(i);
  }

}
