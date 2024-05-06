import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../quiz.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './lesson-quiz.component.html',
  styleUrl: './lesson-quiz.component.css'
})
export class LessonQuizComponent implements OnInit{

  @Input() questions: QuizQuestion[] = [];

  quizForm: FormGroup;
  score: number = 0;
  currentQuestionIndex: number = 0;
  showNextButton: boolean = false;
  showResultButton: boolean = false;
  answerSubmitted: boolean = false;
  selectedAnswerIndex: number | null = null;
  quizCompleted: boolean = false;

  constructor(private fb: FormBuilder) { 
    this.quizForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const formGroup: { [key: string]: any } = {};
    this.questions.forEach((question, index) => {
      formGroup['question' + index] = '';
    });
    this.quizForm = this.fb.group(formGroup);
  }

  submitQuiz(): void {
    const selectedAnswer = this.quizForm.value['question' + this.currentQuestionIndex];
    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
    this.answerSubmitted = true;
    this.selectedAnswerIndex = selectedAnswer;
    if (selectedAnswer === correctAnswer) {
      this.score++;
    }
    this.showNextButton = true;
    if (this.currentQuestionIndex === this.questions.length - 1) {
      
      this.showNextButton = false;
      this.showResultButton = true;

    }
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.showNextButton = false;
    this.answerSubmitted = false;
    this.selectedAnswerIndex = null;
  }

  goToResult(): void {
    this.quizCompleted = true; // Set quizCompleted to true only after answering the last question
  }

  retakeQuiz(): void {
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.showNextButton = false;
    this.showResultButton = false;
    this.answerSubmitted = false;
    this.selectedAnswerIndex = null;
    this.quizCompleted = false;
    this.quizForm.reset();
  }

}
