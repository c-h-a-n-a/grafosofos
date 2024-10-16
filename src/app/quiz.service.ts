import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {}

  getQuestionsByLesson(lesson: string): Observable<any> {
  
    return this.http.get<any>(`https://grafosofos-webapi-production.up.railway.app/api/questions/${lesson}`);  // this is the url for local development: http://localhost:8080/api/questions/${lesson} https://grafosofos-webapi-production.up.railway.app/api/questions/${lesson}
  }
}
