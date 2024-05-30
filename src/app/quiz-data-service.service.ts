import { Injectable } from '@angular/core';
import { QuizQuestion } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizDataServiceService {

  
  private questions: QuizQuestion[] = [];

  constructor() { }

  
  setQuestions(questions: QuizQuestion[]) {
    this.questions = questions;
  }

  getQuestions(): QuizQuestion[] {
    return this.questions;
  }
}
