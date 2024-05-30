import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterLink } from '@angular/router';
import { QuizQuestion } from '../quiz.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { QuizDataServiceService } from '../quiz-data-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-lesson-text',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './lesson-text.component.html',
  styleUrl: './lesson-text.component.css'
})
export class LessonTextComponent implements OnInit{

  quizData: any;
  lessonId!: string;
  //lessonId = 'lesson-1';

  questions: QuizQuestion[] = [];

  //@Input() questions: QuizQuestion[] = [];
  quizForm: FormGroup;
  score: number = 0;
  currentQuestionIndex: number = 0;
  showNextButton: boolean = false;
  showResultButton: boolean = false;
  answerSubmitted: boolean = false;
  selectedAnswerIndex: number | null = null;
  quizCompleted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizDataService: QuizDataServiceService,
    private fb: FormBuilder
  ) {
    this.quizForm = this.fb.group({});
  }

  ngOnInit() {
    // Using type assertion
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;//you need this to return back to lesson1Component
    console.log(this.lessonId);

    // Or using a default value
    // this.lessonId = this.route.snapshot.paramMap.get('lessonId') ?? '';

    /*
    this.questions = this.quizDataService.getQuestions();
    if (this.questions.length === 0) {
      console.error('Questions not found in quiz data service');
    } else {
      console.log('Retrieved questions:', this.questions);
    }
    */

    this.route.paramMap.subscribe(params => {
      const lessonId = params.get('lessonId');
      this.questions = this.quizDataService.getQuestions();
      if (this.questions.length === 0) {
        console.error('Questions not found in quiz data service');
      } else {
        console.log('Retrieved questions:', this.questions);
        this.initForm();
      }
    });    
  }

  initForm(): void {
    const formGroup: { [key: string]: any } = {};
    this.questions.forEach((question, index) => {
      formGroup['question' + index] = '';
    });
    this.quizForm = this.fb.group(formGroup);
  }

  submitQuiz(): void {
    const selectedAnswer = this.quizForm.value['question' + this.currentQuestionIndex]; console.log('the selected answer is: ',selectedAnswer);
    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer; console.log('the correct answer will be: ', correctAnswer);
    this.answerSubmitted = true;
    this.selectedAnswerIndex = selectedAnswer; console.log('this selected answer', this.selectedAnswerIndex);
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
    console.log('currentQuestionIndex: ', this.currentQuestionIndex);
    console.log('showNextButton: ', this.showNextButton);
    console.log('answerSubmitted: ', this.answerSubmitted);
    console.log('selectedAnswerIndex: ', this.selectedAnswerIndex);
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

  backToLesson() {
    this.router.navigate(['/lessons', this.lessonId]);
  }

}
