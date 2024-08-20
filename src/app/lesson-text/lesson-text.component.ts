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
  questions: QuizQuestion[] = [];
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
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;
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
      formGroup['question' + index] = [null];
    });
    this.quizForm = this.fb.group(formGroup);
    console.log('Initialized form controls:', this.quizForm.value);
  }

  submitQuiz(): void {
    const controlName = 'question' + this.currentQuestionIndex;
    const selectedAnswer = this.quizForm.value[controlName];

    console.log(`Form Control Value for ${controlName}:`, selectedAnswer);

    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
    this.answerSubmitted = true;
    this.selectedAnswerIndex = selectedAnswer;

    console.log('Selected Answer:', this.selectedAnswerIndex);
    console.log('Correct Answer:', correctAnswer);

    if (this.selectedAnswerIndex === correctAnswer) {
      this.score++;
    }
    this.showNextButton = true;
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.showNextButton = false;
      this.showResultButton = true;
    }

    console.log('Form Control Values after submission:', this.quizForm.value);
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    this.showNextButton = false;
    this.answerSubmitted = false;
    this.selectedAnswerIndex = null;

    console.log('Moving to next question');
    console.log('Current Question Index:', this.currentQuestionIndex);

    this.resetFormControlForCurrentQuestion();
  }

  resetFormControlForCurrentQuestion(): void {
    const controlName = 'question' + this.currentQuestionIndex;
    if (this.quizForm.contains(controlName)) {
      this.quizForm.get(controlName)?.setValue(null);
    } else {
      this.quizForm.addControl(controlName, this.fb.control(null));
    }
    console.log(`Form Control Value for ${controlName} after reset:`, this.quizForm.value[controlName]);
  }

  goToResult(): void {
    this.quizCompleted = true;
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

    this.initForm();
  }

  backToLesson() {
    this.router.navigate(['/lessons', this.lessonId]);
  }
}
