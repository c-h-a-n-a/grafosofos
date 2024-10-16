import { Component, Input, OnInit } from '@angular/core';
import { Question, QuizQuestion } from '../quiz.model';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-lesson-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './lesson-quiz.component.html',
  styleUrl: './lesson-quiz.component.css'
})
export class LessonQuizComponent implements OnInit{

  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: string = '';
  showFeedback: boolean = false;
  feedbackMessage: string = '';
  score: number = 0;
  quizFinished: boolean = false;
  lessonId: string = '';
  title: string = '';

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const lesson = this.route.snapshot.paramMap.get('lessonId');
    this.getQuestionsByLesson(lesson);

    this.getTitle(lesson as string);
  }

  getTitle(lesson: string){

    switch ( lesson ) {
      case 'lesson1':
          this.title = 'Campus Journalism';
          break;
      case 'lesson2':
          this.title = 'Types of Campus Journalism';
          break;
      case 'lesson3':
          this.title = 'Types of Campus Journalism';
          break;
      case 'lesson4':
          this.title = 'Rules in Writing';
          break;
      case 'lesson5':
          this.title = 'Rules in Writing';
          break;
      default: 
          // 
          break;
   }
  }

  getQuestionsByLesson(lesson: string | null): void {
    console.log(lesson);
    if (lesson) {
      this.quizService.getQuestionsByLesson(lesson).subscribe(data => {
        this.questions = data; 
        //console.log(this.questions);
        if (this.questions.length === 0) {
          this.quizFinished = true;  // If no questions are fetched
        }
      });
    }
  }

  submitAnswer(): void {
    this.showFeedback = true;
    const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
    if (this.selectedOption === correctAnswer) {
      this.feedbackMessage = 'Correct answer!';
      this.score++;
    } else {
      this.feedbackMessage = `Incorrect. The correct answer is: ${correctAnswer}`;
    }
  }

  nextQuestion(): void {
    this.showFeedback = false;
    this.selectedOption = '';
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.quizFinished = true;
    }
  }

  retakeQuiz(): void {
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  backToLesson() {
    this.router.navigate(['/lessons', this.lessonId]);
  }
}
