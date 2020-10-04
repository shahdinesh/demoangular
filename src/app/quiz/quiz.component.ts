import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { MessageService } from '../message.service';
import { UserAnswer } from '../user-answers';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  progressPercentage = 0;
  questionCount = 0;
  currentIndex = 1;
  quizQuestions: any;
  currnetQuestion: any;
  btnText = 'Next';
  showResult = false;

  submitedAnswers: UserAnswer[] = [];
  currentForm: FormGroup;
  correctAnswerCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuizQuestion().subscribe(
      (data) => {
        this.quizQuestions = data;
        this.questionCount = data.length;
        this.progressPercentage = Math.ceil(
          (this.currentIndex / this.questionCount) * 100
        );
        this.currnetQuestion = data[0];
        this.resetForm(this.currnetQuestion.id);
      },
      (err) => {}
    );
  }

  resetForm(question_id) {
    this.currentForm = this.formBuilder.group({
      question_id: new FormControl(question_id),
      user_answer: new FormControl(''),
    });
  }

  pushUserAnswer() {
    var user_answer = this.currentForm.value.user_answer;
    var correctAnswer = this.currnetQuestion.answers.find(
      (answer) => answer.is_true == 1
    );
    correctAnswer = correctAnswer.id == user_answer;
    this.submitedAnswers.push({
      question_id: this.currentForm.value.question_id,
      correct_answer: correctAnswer,
      user_answer: this.currentForm.value.user_answer,
    });
  }

  nextQuestion() {
    if (this.progressPercentage < 100) {
      this.pushUserAnswer();

      this.currentIndex += 1;
      this.progressPercentage = Math.ceil(
        (this.currentIndex / this.questionCount) * 100
      );
      this.currnetQuestion = this.quizQuestions[this.currentIndex - 1];

      if (this.currentIndex == this.questionCount)
        this.btnText = 'Finish';
    } else {
      this.showResult = true;
      var correctAnsers = this.submitedAnswers.filter(submitedAnswer => submitedAnswer.correct_answer == true);
      this.correctAnswerCount = correctAnsers.length;
    }
    this.resetForm(this.currnetQuestion.id);
  }
}
